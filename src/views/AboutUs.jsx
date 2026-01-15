import ContactForm from "./ContactForm.jsx";
import { motion } from "framer-motion";
import {
  IconCode,
  IconDatabase,
  IconBrandReact,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandJavascript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandTailwind,
  IconBrandMongodb,
  IconBrandFirebase,
  IconBrandTypescript,
  IconBrandGit,
  IconDeviceDesktop,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconExternalLink,
  IconDownload,
  IconMapPin,
  IconPhone,
  IconSchool,
  IconCertificate,
  IconCalendar,
  IconTrophy,
  IconApi,
  IconFlask,
  IconBrandRedux,
  IconChartBar,
  IconChartLine,
  IconTerminal,
  IconBrandNextjs,
  IconDatabase as IconPostgreSQL,
  IconBrandSocketIo,
  IconBrandDocker,
  IconBrandStripe,
  IconServer,
  IconWorldWww,
  IconBolt,
} from "@tabler/icons-react";
import { Highlighter } from "../components/ui/highlighter.jsx";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-6 gap-y-4 w-7/12">
      <h2 className="text-3xl font-bold text-center">JSD#11 - Chairat N.</h2>
      <img src="myimage.jpg" alt="user image" className="w-64 rounded-2xl" />
      <p className="text-center pb-2">
        <span className="text-2xl font-bold">System Administrator</span>
        <br /> <br />
        "Hello! I am the System Administrator for this platform. My goal is to
        ensure you have the best experience possible while using our
        services.Whether you are looking to get started or want to share your
        thoughts, I am here to assist: Sign Up / Feedback / Suggestions
        <br />
        <br />
        <strong className="text-amber-600 text-xl">
          "I look forward to hearing from you!"
        </strong>
      </p>

      {/* Contact Section */}
      <section>
        <div className="flex flex-col items-center w-full max-w-3xl bg-gradient-to-l from-gray-200 to-gray-100 backdrop-blur-sm border rounded-2xl p-5">
          <h2 className="text-xl text-center md:text-3xl font-bold pb-2 mb-6">
            Let's Connect 🚀
          </h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="px-2">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                Get in Touch 
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 sm:gap-4 text-blue-600">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                    <IconMail
                      size={18}
                      className="text-blue-600 sm:w-5 sm:h-5"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base">Email</p>
                    <p className="text-black text-sm sm:text-base break-all">
                      chairatnn@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-blue-600">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                    <IconPhone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-black">+66 83 669 1717</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-blue-600">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg">
                    <IconMapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-black">Bangkok, Thailand</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-l from-blue-400 to-blue-200 backdrop-blur-sm rounded-xl p-6 border border-blue-200 w-max">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
