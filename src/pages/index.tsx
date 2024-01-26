import { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

// #d77900
// Add a sweet button to the top right of the form to clear it

const emailsSchema = z.object({
  message: z.string().min(0, {
    message: "Please include some emails.",
  }),
})

const formSchema = z.object({
  titleAndPurpose: z.string().min(0, {
    message: "Please include some a title/purpose.",
  }),
  why: z.string().min(0, {
    message: "Please include some a why statement.",
  }),
  when: z.string().min(0, {
    message: "Please include some a when statement.",
  }),
  whereAndAffectedArea: z.string().min(0, {
    message: "Please include some a when statement.",
  }),
  restrictions: z.string().min(0, {
    message: "Please include some a when statement.",
  }),
  questionAuthorities: z.string().min(0, {
    message: "Please include some a when statement.",
  }),
})

export default function TestingPNNLEmails() {
  const [filteredEmails, setFilteredEmails] = useState("")
  const [submissionFormFeedback, setSubmissionFormFeedback] = useState(false)
  const [submissionEmailFeedback, setSubmissionEmailFeedback] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [copyFormSuccess, setCopyFormSuccess] = useState(false)
  const [allowNoticeCopy, setAllowNoticeCopy] = useState(true)
  const [allowEmailsCopy, setAllowEmailsCopy] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)

  const [formValues, setFormValues] = useState({
    titleAndPurpose:
      "PSF Facilities Chilled Water/Compressed Air Outage to support LSW Construction",
    why: "Contractors will be replacing a chilled water supply line valve",
    when: "December 8<sup>th</sup> , 6:00 AM - December 9<sup>th</sup>, 8:00 PM",
    whereAndAffectedArea:
      "There will be no chilled or process water cooling available for the PSF facilities (2314, 1235, 1234, 3234, 7777, 4563, 5678, 4563, 3456). <br></br> There will be no compressed air available for the PSF facilities (6643, 2345, 5432, 1324, 5534, 2234, 5543, 2234, 5543).",
    restrictions:
      "Equipment and processes that require plant cooling water or compressed air must be shut down and made safe prior to the outage.",
    questionAuthorities:
      "If you have any questions, please contact Sandra Fies 555.555.5555 or Robert McKinney 555.555.5555",
  })

  function removeDuplicateEmails(emails: string): string {
    const emailArray = emails.split(";").map((email) => email.trim()) // Trim each email
    const uniqueEmails = new Set(emailArray.filter((email) => email)) // Filter out empty strings
    return Array.from(uniqueEmails).join("; ")
  }

  // useEffect(() => {

  //     function removeDuplicateEmails(emails: string): string {
  //         const emailArray = emails.split(';');
  //         const uniqueEmails = new Set(emailArray);
  //         return Array.from(uniqueEmails).join(';');
  //     }

  //     // Example usage:
  //     const emailString = "email10@example.com;email25@example.com;email1@example.com;email36@example.com;email23@example.com;email21@example.com;email0@example.com;email28@example.com;email17@example.com;email4@example.com;email29@example.com;email31@example.com;email35@example.com;email25@example.com;email5@example.com;email9@example.com;email19@example.com;email12@example.com;email2@example.com;email38@example.com;email26@example.com;email13@example.com;email22@example.com;email39@example.com;email16@example.com;email5@example.com;email27@example.com;email23@example.com;email32@example.com;email9@example.com;email26@example.com;email33@example.com;email15@example.com;email3@example.com;email34@example.com;email18@example.com;email12@example.com;email6@example.com;email24@example.com;email7@example.com;email39@example.com;email30@example.com;email14@example.com;email22@example.com;email8@example.com;email0@example.com;email28@example.com;email37@example.com;email11@example.com;email20@example.com";
  //     const filteredEmails = removeDuplicateEmails(emailString);

  //     console.log(filteredEmails)

  //     // // Copying to clipboard (can be triggered by a user action like button click)
  //     // navigator.clipboard.writeText(filteredEmails)
  //     //     .then(() => console.log('Copied to clipboard!'))
  //     //     .catch(err => console.error('Error copying text: ', err));

  //   }, [])

  function convertToSuperscript(text: string): string {
    // Define a regular expression pattern to find dates like "12th", "1st", "3rd", and "4th"
    const pattern =
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s(\d+)(st|nd|rd|th)\b/g

    // Replace the found patterns with HTML superscript tags
    return text.replace(
      pattern,
      (match: string, month: string, day: string, suffix: string) => {
        return `${month} ${day}<sup>${suffix}</sup>`
      }
    )
  }

  // TODO Add recursion here for the number of characters

  function insertLineBreakAt(text: string, maxChars: number): string {
    if (text.length <= maxChars) return text

    let breakPoint = text.lastIndexOf(" ", maxChars)
    if (breakPoint === -1) breakPoint = maxChars

    return (
      text.substring(0, breakPoint) + "<br></br>" + text.substring(breakPoint)
    )
  }

  const formEmail = useForm<z.infer<typeof emailsSchema>>({
    resolver: zodResolver(emailsSchema),
    defaultValues: {},
  })

  const formFormEmail = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmitEmails = (values: z.infer<typeof emailsSchema>) => {
    const emails = removeDuplicateEmails(values.message)
    setFilteredEmails(emails) // Update state with filtered emails
    console.log(emails)
    // setFormDone(true);
    // formEmail.reset({ message: "" })

    setSubmissionEmailFeedback(true)
    setAllowEmailsCopy(false)

    // Set a timeout to hide the checkmark after 0.5 seconds
    setTimeout(() => {
      setSubmissionEmailFeedback(false)
    }, 1500)
  }

  const onSubmitForm = (values: z.infer<typeof formSchema>) => {
    const processedValues = {
      ...values,
      when: convertToSuperscript(values.when),
      whereAndAffectedArea: insertLineBreakAt(values.whereAndAffectedArea, 100), // Adjust 100 to your preference
    }
    setFormValues(processedValues)
    console.log("these are the form values:", processedValues)
    setAllowNoticeCopy(false)

    // Reset the formFormEmail form
    // formFormEmail.reset({
    //   titleAndPurpose: "",
    //   why: "",
    //   when: "",
    //   whereAndAffectedArea: "",
    //   restrictions: "",
    //   questionAuthorities: "",
    // })

    setSubmissionFormFeedback(true)

    // Set a timeout to hide the checkmark after 0.5 seconds
    setTimeout(() => {
      setSubmissionFormFeedback(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    if (filteredEmails) {
      navigator.clipboard
        .writeText(filteredEmails)
        .then(() => {
          setCopySuccess(true) // Set success state to true on successful copy
          setTimeout(() => setCopySuccess(false), 1500) // Reset the state after 1.5 seconds
          formEmail.reset({ message: "" })
          setAllowEmailsCopy(true)
        })
        .catch(() => {
          setCopySuccess(false)
        })
    } else {
    }
  }

  const handleExampleSubmission = () => {
    // Set form fields with example data from formValues state
    formFormEmail.setValue("titleAndPurpose", formValues.titleAndPurpose)
    formFormEmail.setValue("why", formValues.why)
    formFormEmail.setValue("when", formValues.when)
    formFormEmail.setValue(
      "whereAndAffectedArea",
      "There will be no chilled or process water cooling available for the PSF facilities (3400, 3410, 3420, 3430, 3425, 3440, 3820, 3850, 3860). There will be no compressed air available for the PSF facilities (3400, 3410, 3420, 3430, 3425, 3440, 3820, 3850, 3860)."
    )
    formFormEmail.setValue("restrictions", formValues.restrictions)
    formFormEmail.setValue(
      "questionAuthorities",
      formValues.questionAuthorities
    )

    // Optionally, you can simulate form submission to show the result
    // If you want to actually submit the form and show the result, uncomment the next line
    // onSubmitForm(formFormEmail.getValues());
  }

  const copyHtmlToClipboard = () => {
    const selection = window.getSelection()
    if (contentRef.current && selection) {
      const range = document.createRange()
      range.selectNode(contentRef.current)
      selection.removeAllRanges() // Clear current selection
      selection.addRange(range) // Select the text content
      try {
        document.execCommand("copy")
        formFormEmail.reset({
          titleAndPurpose: "",
          why: "",
          when: "",
          whereAndAffectedArea: "",
          restrictions: "",
          questionAuthorities: "",
        })
        setAllowNoticeCopy(true)
        selection.removeAllRanges() // Clear selection after copy
        setCopyFormSuccess(true) // Set success state to true on successful copy
        setTimeout(() => setCopyFormSuccess(false), 1500) // Reset the state after 1.5 seconds
      } catch (error) {
      }
    }
  }

  // const downloadTemplate = () => {
  //   // Create a Blob from the HTML String
  //   const blob = new Blob([emailTemplate.html], { type: "text/html" })
  //   // Create a link element
  //   const link = document.createElement("a")

  //   // Set the download attribute with a filename
  //   link.download = "email-template.html"

  //   // Create a URL for the Blob and set it as the href of the link
  //   link.href = window.URL.createObjectURL(blob)

  //   // Append the link to the body
  //   document.body.appendChild(link)

  //   // Trigger the download
  //   link.click()

  //   // Clean up and remove the link
  //   link.parentNode?.removeChild(link)
  // }

  return (
    <div className="bg-white h-fit py-12">
      <div className="container text-6xl font-bold text-center text-cws-dark pb-12">
        PNNL Outage Email App
      </div>
      <div className="flex items-center justify-center text-5xl text-black bg-white text-start w-full container gap-6">
        <div className="w-full lg:w-1/2 flex flex-col h-fit bg-gray-300 ">
          <div className="h-full bg-gray-200 px-6 rounded-md bg-pnnl/90 pb-6">
            <Form {...formFormEmail}>
              <form
                onSubmit={formFormEmail.handleSubmit(onSubmitForm)}
                className="flex flex-col items-center justify-center text-primary"
              >
                <FormField
                  control={formFormEmail.control}
                  name="titleAndPurpose"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="drop-shadow-xl text-2xl IOS-black">
                        Title & Purpose
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Title and purpose"
                          {...field}
                          className="bg-white drop-shadow-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFormEmail.control}
                  name="why"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="drop-shadow-xl text-2xl IOS-black">
                        Why
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Why statement"
                          {...field}
                          className="bg-white drop-shadow-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFormEmail.control}
                  name="when"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="drop-shadow-xl text-2xl IOS-black">
                        When
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="When statement"
                          {...field}
                          className="bg-white drop-shadow-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFormEmail.control}
                  name="whereAndAffectedArea"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-2xl IOS-black">
                        Where/Affected Area
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-48 h-24 bg-white drop-shadow-xl"
                          placeholder="Where will the affected areas be?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFormEmail.control}
                  name="restrictions"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-2xl IOS-black">
                        Restrictions
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-48 h-24 bg-white drop-shadow-xl"
                          placeholder="What restrictions are there?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formFormEmail.control}
                  name="questionAuthorities"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-2xl IOS-black">
                        Notification Statement
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-48 h-24 bg-white drop-shadow-xl"
                          placeholder="Notification statement"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-6 items-center h-fit mt-6">
                  <Button
                    className={`h-12 w-48 rounded-sm  drop-shadow-2xl text-lg hover:bg-[#5a0b0d] fade-bg-transition ${
                      submissionFormFeedback
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-[#911a1d]"
                    }`}
                    type="submit"
                  >
                    {submissionFormFeedback ? <Check /> : "Create Notice"}
                  </Button>
                  <Button
                    disabled={allowNoticeCopy}
                    className={`h-12 rounded-sm w-64 drop-shadow-2xl text-lg ${
                      copyFormSuccess
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-gray-600 hover:bg-gray-800"
                    }`}
                    type="button"
                    onClick={copyHtmlToClipboard}
                  >
                    {copyFormSuccess ? "Copied!" : "Copy Notice to Clipboard"}
                  </Button>
                </div>
                {/* {formDone && (
                <div className="text-lg font-bold text-cws-blue text-center w-[80%]">
                  Your form has been successfully submitted and we will get back
                  to your shortly!
                </div>
              )} */}
              </form>
            </Form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-start mb-auto drop-shadow-xl rounded reounded-lg px-10 gap-12">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="text-start flex text-3xl font-semi-bold text-decoration underline">
                How to Use
              </div>
              <div className="text-start flex text-lg">
                Welcome to the PNNL Outage Email App! Follow these simple steps:
              </div>
              <ul className="text-start flex flex-col gap-1 text-lg list-disc list-inside">
                <li>
                  Fill in the input fields to create your outage notification.
                </li>
                <li>
                  Click 'Submit' to generate your email template. You can then
                  copy it for use.
                </li>
                <li>
                  Paste bulk emails into the 'Bulk Emails' field. Our tool will
                  automatically remove any duplicates and format them correctly.
                  Then, copy the emails to clipbaord and use in outage
                  notification email.
                </li>
                <li>
                  For an example, hit the 'Show Example' button below and then
                  'Submit', and see how a filled form looks down below!
                </li>
              </ul>
              <Button
                className="h-12 w-48 rounded-sm bg-blue-500 hover:bg-blue-700 drop-shadow-2xl text-lg"
                type="button"
                onClick={handleExampleSubmission}
              >
                Show Example
              </Button>
            </div>
          </div>
          <div className="h-full bg-gray-200 px-6 rounded-md bg-pnnl/90 pb-6">
            <Form {...formEmail}>
              <form
                onSubmit={formEmail.handleSubmit(onSubmitEmails)}
                className="space-y-4 flex flex-col items-center justify-center text-primary"
              >
                <FormField
                  control={formEmail.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-2xl IOS-black font-semibold">
                        Bulk Emails
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="max-h-48 h-24 bg-white drop-shadow-xl"
                          placeholder="Paste bulk emails from Lab Assist here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-12">
                  <Button
                    className={`h-12 rounded-sm w-48 drop-shadow-2xl text-lg hover:bg-[#5a0b0d] fade-bg-transition ${
                      submissionEmailFeedback
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-[#911a1d]"
                    }`}
                    type="submit"
                  >
                    {submissionEmailFeedback ? <Check /> : "Filter Emails"}
                  </Button>
                  <Button
                    disabled={allowEmailsCopy}
                    className={`h-12 rounded-sm w-64 drop-shadow-2xl text-lg ${
                      copySuccess
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-gray-600 hover:bg-gray-800"
                    }`}
                    type="button"
                    onClick={copyToClipboard}
                  >
                    {copySuccess ? "Copied!" : "Copy Emails to Clipboard"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="py-20 flex flex-col w-full h-full z-10 text-center items-center border-0 borderless">
        <div
          ref={contentRef}
          className="flex w-full flex-col text-center items-center"
        >
          <p style={{ textAlign: "center", border: "none", }}>
            <span
              style={{
                fontSize: "20.0pt",
                // fontFamily: '"Century Gothic", sans-serif',
                color: "white",
                background: "blue",
                padding: "5px", 
                border: "none",
                // color:"#8a2be2",
              }}
            >
              <strong
              style={{
                border: "none",
              }}>
                <u>NOTICE</u>
              </strong>
            </span>
          </p>

          <p style={{
            border: "none",
          }}>&nbsp;</p>

          <p
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "14.0pt",
              border: "none",
              // fontFamily: '"Century Gothic", sans-serif',
            }}
          >
            <strong
            style={{
              border: "none",
            }}>{formValues.titleAndPurpose}</strong>
          </p>

          <p
            style={{
              fontSize: "14.0pt",
              border: "none",
              // fontFamily: '"Century Gothic", sans-serif',
            }}
          >
            &nbsp;
          </p>

          <p
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "14.0pt",
              border: "none",
              // fontFamily: '"Century Gothic", sans-serif',
            }}
          >
            <strong             
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "14.0pt",
              border: "none",
              // fontFamily: '"Century Gothic", sans-serif',
            }}>
              Why:</strong>&nbsp;
            {formValues.why}
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            &nbsp;
          </p>
          <p
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "14.0pt",
              border: "none",
              // fontFamily: '"Century Gothic", sans-serif',
            }}
          >
            <strong
            style={{
              border: "none",
            }}>When:</strong>&nbsp;
            <strong
            style={{
              color: "black", background: "yellow", border: "none", 
            }}>
              <span
                dangerouslySetInnerHTML={{ __html: formValues.when }}
              />
            </strong>
          </p>
          {/* Working, but bad width */}
          {/* <p
            className="w-fit"
            style={{
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              color: "black",
              background: "yellow",
            }}
          >
            <strong>
              <u   className="w-fit">Email and CNS Outage Completion Notice will be sent out</u>
            </strong>
          </p> */}
          {/* <p style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "14.0pt",
                // fontFamily: '"Century Gothic", sans-serif',
                color: "black",
                background: "yellow",
              }}
            >
              <strong>
                <u>Email and CNS Outage Completion Notice will be sent out</u>
              </strong>
            </span>
          </p> */}

          <p
            style={{
              textAlign: "center",
              fontSize: "14.0pt",
              fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            &nbsp;
          </p>

          <p
            style={{
              textAlign: "center",
              color: "black",
              fontSize: "14.0pt",
              fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            <strong
              style={{
                border: "none",
              }}>Where/Affected Area:</strong>&nbsp;
            <span
              dangerouslySetInnerHTML={{
                __html: formValues.whereAndAffectedArea,
              }}
              style={{
                border: "none",
              }}
            />
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            &nbsp;
          </p>

          <p
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            <strong
            style={{
              border: "none",
            }}>Restrictions:</strong>&nbsp;&nbsp;
            <span style={{ 
              color: "red",
              border: "none",}}>
                {formValues.restrictions}</span>
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            &nbsp;
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              color: "#0070C0",
              border: "none",
            }}
          >
            As a general safety reminder, we ask that you be cognizant of the
            work activities and be sure to stay clear of all posted/barricaded
            areas.
          </p>

          <p
            style={{
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            &nbsp;
          </p>

          <p
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "14.0pt",
              // fontFamily: '"Century Gothic", sans-serif',
              border: "none",
            }}
          >
            {formValues.questionAuthorities}
          </p>
        </div>
      </div>
    </div>
  )
}
