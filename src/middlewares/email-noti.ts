import nodemailer from "nodemailer";
import { Interface } from "readline";
import { Optional } from "sequelize";
interface UPDATEDATA {
  name: string;
  profile: string;
}
const updadeProfileNotifiacation = (
  userData: Optional<UPDATEDATA, "name" & "profile">,
  email: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ntirukelly@gmail.com",
      pass: "xlja ztip cahg jvwc",
    },
  });
  let message = " ";
  if (userData.name) {
    message += "name: " + userData.name + "<br/>";
  }
  if (userData.profile) {
    message += "profile: " + userData.profile + "<br/>";
  }
  const mailOptions = {
    from: "atlptestauth@gmail.com",
    to: email,
    subject: "UPDATING USER PROFILE",
    html: `
    <p> You have updated the following information :${message}</p>
    <p>THANK YOU FOR UPDATING YOUR PROFILE</p>`,
  };
  transporter.sendMail(
    mailOptions,
    function (error: Error | null, info: nodemailer.SentMessageInfo) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};
export default updadeProfileNotifiacation;
