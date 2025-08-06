import AboutHeader from "../../components/partials/about/AboutHeader";
import PlatformJourney from "../../components/partials/about/journeyMilestones";
import OurMission from "../../components/partials/about/OurMission";
import { TeamMembers } from "../../components/partials/about/TeamMembers";
import WhyChooseUs from "../../components/partials/home/WhyChooseUs";

export default function About () {
    return(
        <>
            <AboutHeader />
            <OurMission />
            <PlatformJourney />
            <TeamMembers />
            <WhyChooseUs />
        </>
    )
}