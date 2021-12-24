async function sendMail()
{
    const text = `Dear Mr/Mrs Abdallah\n
    we hope you are doing well.`;

     

     let transporter = nodemailer.createTransport({
        service: 'gmail',
      auth: {
            user : authorization.user,
            pass : authorization.password
      }
    });

    let info = await transporter.sendMail({
        from: `${authorization.user}`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "cancellation confirmation", // Subject line
        text: text, // plain text body
        
      });
      
}

//sendMail();
const text = `Dear Mr/Mrs Abdallah,

we hope you are doing well. This mail is to confirm that you have made a reservation with id 1234 that is going from Cairo to Bali.

Departure Flight:
    from: Cairo, departure time: 2021/12/17 at 15:00 terminal 3
    to: Bali, arrival time: 2021/12/27 at 22:00 terminal 1
    Seats: C1, C2, C3
    `;

console.log(text);

const arr = ['C1, C2, C3']
console.log(arr.toString());