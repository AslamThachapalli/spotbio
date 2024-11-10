import { cn } from "@/lib/utils";
import { PlatformType } from "@prisma/client"

import { FaInstagram, FaLinkedin, FaGithub, FaTiktok, FaYoutube, FaFacebook, FaEnvelope, FaGlobe } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const SocialIcon = ({type, width, height, className}: {type: PlatformType, width?: string, height?: string, className?: string}) => {
    let icon = null; 
    switch (type) {
        case 'EMAIL':
            icon = <FaEnvelope style={{width: width, height: height}}/>;
            break;
        case 'X':       
            icon = <FaX style={{width: width, height: height}}/>;
            break;
        case 'INSTAGRAM':
            icon = <FaInstagram style={{width: width, height: height}}/>;
            break;
        case 'LINKEDIN':
            icon = <FaLinkedin style={{width: width, height: height}}/>;
            break;
        case 'GITHUB':
            icon = <FaGithub style={{width: width, height: height}}/>;
            break;
        case 'TIKTOK':
            icon = <FaTiktok style={{width: width, height: height}}/>;
            break;
        case 'WEBSITE':
            icon = <FaGlobe style={{width: width, height: height}}/>;
            break;
        case 'YOUTUBE':
            icon = <FaYoutube style={{width: width, height: height}}/>;
            break;
        case 'FACEBOOK':
            icon = <FaFacebook style={{width: width, height: height}}/>;
            break;
        default:
            console.warn(`No icon found for platform type: ${type}`);
    }

    return (
        <span className={cn(className)}>
            {icon}
        </span>
    )
}

export default SocialIcon