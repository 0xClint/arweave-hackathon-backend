import nodeMailer from "nodemailer";
import { template } from "../utils/template.js";
import dotenv from "dotenv";
dotenv.config();

export async function mailSender(arrData) {
  //transporter:
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_APP_USER,
      pass: process.env.EMAIL_APP_PASS,
    },
  });

  if (arrData) {
    // Define and send message inside transporter.sendEmail() and await info about send from promise:
    arrData.forEach(async (data) => {
      const dataInput = {
        user: data?.node?.owner?.name ? data.node.owner.name : "User",
        txId: data.node.id,
        ownerAdd: data.node.owner.address,
        timestamp: new Date(data.node.block.timestamp * 1000),
        blockId: data.node.block.id,
        fee: data.node.fee.ar,
      };
      console.log(dataInput);
      let info = {
        from: process.env.EMAIL_APP_USER,
        to: data.node.owner.email,
        subject: "Your Recent Blockchain Transaction",
        text: template(dataInput),
      };

        await transporter.sendMail(info, (err, result) => {
          if (err) {
            console.log("Error in sending Mail", err);
          } else {
            console.log("Mail sent successfully", info);
          }
        });
    });
  }
}
