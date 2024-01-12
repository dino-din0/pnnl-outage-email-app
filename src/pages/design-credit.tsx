import { useRouter } from "next/router";
import LayoutRegular from "../components/layout-regular";
import DesignCreditHero from "../components/home-hero/design-credit-hero";
import { siteConfig } from '@/config/site';

export default function NoPageFound() {
  const router = useRouter();
  const href = router.pathname;



  return (
    <>
      <LayoutRegular
        title={`Design Credit | ${siteConfig.name} – ${siteConfig.slogan}`}
        description="Next generation websites for businesses located in the Pacific Northwest. Establish a superior online presence with Cascade Web Solutions today."
      >
        <DesignCreditHero></DesignCreditHero>
      </LayoutRegular>
    </>
  );
}
