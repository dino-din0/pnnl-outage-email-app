
import { useRouter } from "next/router";
import React from "react";
import LayoutRegular from "../components/layout-regular";
import PrivacyPolicyHero from "../components/home-hero/privacy-policy-hero";


export default function TermsOfService() {
  const router = useRouter();
  const href = router.pathname;

  return (
    <>
      <LayoutRegular
        title="Oops! Page Not Found | Company name goes here - maybe their slogan too"
        description="Oops! It seems you've taken a wrong turn. The page you're looking for doesn't exist or has been moved. Navigate back to Sir Suds Laundry Co. for the best laundromat experience in the Tri-Cities area."
      >
        <PrivacyPolicyHero></PrivacyPolicyHero>
      </LayoutRegular>
    </>
  );
}
