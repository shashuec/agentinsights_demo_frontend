import React from "react";
import LandingPageHeader from "../components/LandingPageHeader";
import AppFooter from "../components/AppFooter";
import { List, ListItem, OrderedList, UnorderedList } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen  relative">
      <LandingPageHeader />
      <div className="bg-gray-100 min-h-screen px-4 py-6 sm:py-12">
        <div className="max-w-5xl space-y-6 mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-md">
          <div className="py-4 px-2 rounded-md shadow-even text-center text-xl sm:text-4xl text-blue-600 font-bold">
            Privacy Policy
          </div>
          <div className="font-bold">
            Privacy Policy for Agent Insights Call Logger
          </div>
          <div>
            <OrderedList className="space-y-2 px-2">
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Introduction</div>
                <div className="text-sm text-black font-normal">
                  Welcome to the Agent Insights Call Logger. This policy
                  outlines our commitment to your privacy and explains our
                  practices regarding data collection, use, and security when
                  you use our app.
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Data Collection</div>
                <div className="text-sm text-black font-normal">
                  <div>What We Collect:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>
                      Call Recordings and Metadata: Includes the recording of
                      calls and details like call duration and caller ID.
                    </ListItem>
                    <ListItem>
                      Device Information: Information about your device, such as
                      make and model, collected during login.
                    </ListItem>
                    <ListItem>
                      Usage Data: Information on how you interact with our app,
                      including logs and device data.
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Use of Data</div>
                <div className="text-sm text-black font-normal">
                  <div>How We Use Your Data:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>
                      Call Data Management: Uploading and storing call
                      recordings and associated metadata.
                    </ListItem>
                    <ListItem>
                      Login Verification: Authenticating users during the login
                      process.
                    </ListItem>
                    <ListItem>
                      App Improvement: Enhancing overall app functionality and
                      user experience.
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Data Sharing and Disclosure</div>
                <div className="text-sm text-black font-normal">
                  <div>Who We Share Data With:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>
                      Service Providers: For necessary app support services like
                      cloud storage and data analysis.
                    </ListItem>
                    <ListItem>
                      Legal Requirements: When obliged by law or for legal
                      processes.
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Data Storage and Security</div>
                <div className="text-sm text-black font-normal">
                  <div>How We Protect Your Data:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>Stored on secure servers.</ListItem>
                    <ListItem>
                      Protected against unauthorized access and disclosure.
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>User Rights</div>
                <div className="text-sm text-black font-normal">
                  <div>Your Privacy Rights:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>
                      Access, modify, or request deletion of your data.
                    </ListItem>
                    <ListItem>Contact us to exercise these rights.</ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Consent and Permissions</div>
                <div className="text-sm text-black font-normal">
                  <div>By using our app, you agree to the following:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>
                      Data Practices: As described in this policy.
                    </ListItem>
                    <ListItem>
                      App Permissions: Including but not limited to:
                      <UnorderedList sx={{ listStyleType: '"- "' }}>
                        <ListItem>
                          Read Call Log: To process and upload call logs.
                        </ListItem>
                        <ListItem>
                          Read Contacts: For caller identification.
                        </ListItem>
                        <ListItem> Read Phone State: To detect calls.</ListItem>
                        <ListItem>
                          Read Phone Numbers: To access numbers in calls.
                        </ListItem>
                        <ListItem>
                          Foreground Service: For background call recording.
                        </ListItem>
                        <ListItem>
                          Read/Write External Storage: To store data locally on
                          older Android versions.
                        </ListItem>
                        <ListItem>
                          Internet Access: For data uploading.
                        </ListItem>
                      </UnorderedList>
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Changes to This Privacy Policy</div>
                <div className="text-sm text-black font-normal">
                  <div>Updates to Our Policy:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>Notified via our application.</ListItem>
                    <ListItem>
                      Reflects changes in practices or legal requirements.
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
              <ListItem className="text-blue-600 text-2xl font-bold">
                <div>Contact Us</div>
                <div className="text-sm text-black font-normal">
                  <div>For Questions or Concerns:</div>
                  <UnorderedList sx={{ listStyleType: '"- "' }}>
                    <ListItem>
                      Reach us at connect@agentinsights.live /
                      www.agentinsights.live.
                    </ListItem>
                  </UnorderedList>
                </div>
              </ListItem>
            </OrderedList>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
};

export default PrivacyPolicy;
