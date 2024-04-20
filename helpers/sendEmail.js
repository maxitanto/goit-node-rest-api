import ElasticEmail from '@elasticemail/elasticemail-client';
import dotenv from 'dotenv';

dotenv.config();

const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_EMAIL_FROM, BASE_URL } = process.env;

const defaultClient = ElasticEmail.ApiClient.instance;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};

export const sendEmail = (emailRecipient, verificationToken) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(emailRecipient)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: 'HTML',
          Content: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
        }),
      ],
      Subject: 'Test email',
      From: ELASTICEMAIL_EMAIL_FROM,
    },
  });
  api.emailsPost(email, callback);
};
