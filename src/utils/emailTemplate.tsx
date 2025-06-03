import { FormDataType } from '@/components/Form/type';
export const EmailTemplate = ({ values }: { values: FormDataType }): string => {
  const {
    message = 'Hello, I’m interested in your services.',
    email,
    name,
    lastname,
    phone,
  } = values;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Message</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #444444;
          }
          .email-container {
            width: 100%;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .email-content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .email-header {
            background-color: #007934;
            padding: 20px;
            text-align: center;
          }
          .email-header img {
            max-width: 120px;
          }
          .email-body {
            padding: 20px;
          }
          .email-body h1 {
            font-size: 22px;
            color: #333333;
            margin-bottom: 20px;
          }
          .email-body p {
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
            margin-bottom: 10px;
          }
          .email-body .info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .email-body .info h2 {
            font-size: 18px;
            color: #444444;
            margin-bottom: 5px;
          }
          .email-body .file-list {
            margin-top: 10px;
            padding-left: 20px;
          }
          .email-footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #888888;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-content">
            <div class="email-header">
              <img
                src="https://carzoomo.s3.us-east-1.amazonaws.com/StarEquipmentlogo.png"
                alt="Star Equipment "
              />
            </div>
            <div class="email-body">
              <h1>You have received a new message!</h1>
              <div class="info">
                <h2>Message Details:</h2>
                ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
                ${lastname ? `<p><strong>Lastname:</strong> ${lastname}</p>` : ''} 
                 ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
                <p><strong>Message:</strong> ${message}</p>
               
              </div>
              <p>Thank you for contacting Star Equipment Company. We'll respond as soon as possible.</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2025 Star Equipment  Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};
