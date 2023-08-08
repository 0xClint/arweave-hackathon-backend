export const template = ({ user, txId, ownerAdd, timestamp, blockId, fee }) => {
  return `
  Dear ${user},

We hope this email finds you well. We would like to inform you that a recent transaction has been successfully processed on the blockchain associated with your account. Below are the details of the transaction:

Transaction ID: ${txId}
Owner Address: ${ownerAdd}
Fee: ${fee} ar
Date and Time: ${timestamp}
Block ID : ${blockId}
Transaction Status: CONFIRMED

If you did not initiate this transaction or have any concerns about its legitimacy, please contact our customer support immediately at [Customer Support Email/Phone Number].

If you have any questions or need further assistance, don't hesitate to reach out to our support team. Thank you for using Notifier!.

Best regards,
Notifier`;
};
