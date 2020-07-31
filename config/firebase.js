const admin = require('firebase-admin');
const { config } = require('./index');

const firebaseConfig = admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'covidchort3',
    private_key_id: config.private_key_id,
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6ZKUw34D93nHg\nAqu7wNtny7EahrxNxchfyCrBVS9dzpBP+D96VDP0VQfyx638xGzfoY7baLEGk82U\n/BFuo6rNW8FQErGXQS6D659Py34Fo2hT124npXoz6yu2Mkucya0R0prHqtAh29B/\nznWeoQnuWkCTfebflnOW9DPAG82RSKmdYIQlipQdxFb/5CjGYM9+asgxTrLzMwmX\n5pLd/Go7PiKBR3BSQzvcQCM9AIpRYbhfXKG7yHww/bhwUtU4/cFCj3eB8LYB2ryc\nc20JYyKKTxOAFqR0D+ylcgkni4yCLRWsM8Tjx/OMdeGCnhE5qVhvPlFlWFGOwyGb\n9V/lODcVAgMBAAECggEAA4endId4mMT5qhK+kVm2wHcaZYv1LQMIn++W6gDSRxuw\nLWM5B3PVDEh2CjVn1g8lF7GmbyiRzxFeKYEL4CkLDw5dJ6Phc7BgkuMxUVpBAOWZ\n7cFRyUoA6uZygBwSOz4T09KPl6XuRdz0+NPjTGRcPOwC+8vGnkpWTJAIpKGF2vib\n98ZaMYshbwk76ho6s103dX3HahAoyFVp1gdZyxFSqMNzpbxoTRQ0Eg4XrgjT//dj\nS8x2gXqaiSb8hfQahxiE7at1vwKmeBeJLyMEvihgCtqup1QLHvt9D4c3K3XTL+SJ\nPjsIpW4HuRUhR6GqLe54eWOC8rYUdCRcCCL45ft0IQKBgQDzoAL+p5c9Hfya9nam\nISaMIgE2olX4SjXfLR6j1hfex+PNG9MMNmrTWLIgjWJt7zKvCNCWkeOk1oAJLduR\nKNBk+sgpC6yUJR4+Da2Z7ORwv5fD3W7L+lNsNdQgptI2Tn5kSFc1iIe+CCVoRrkX\nyCEyjEDYY3bb0qWmo59tvGaGYQKBgQDD3GqM4SPH1pGCbZILKgvUur2Pk3ZkFClc\nt6+7B51sq/4mAye1irLlp3pwP7XfIlU0Vk6kMutMvlx60FYwN4Qf7ekehRlJD84f\n3QD1rPEc/kl5dwOilobukaol4JwKclUUU0ypWFvF69dOgOGG2Ts1JLk3q9fuCx7i\nZlku8u6FNQKBgQC6Jp2jLzMkg/EsBv6J2fK2SJVcxZWi7jFTogozbbc3hszNQGF2\nh24Ap1kT/nQjRA4aKEYZhsfGgA+888k9lU4GmoiutDjdya7eA12Oq6+xZvPzuRKb\n0V5E5Kx9dnpQ/JEe1xer0/LEhTzv/HoZbdXP5dL2hKmhNcdVGNkM5FQCgQKBgEqI\nFvfTONVz/l0+quOatXPXOAlp2RSOY4sHz1SBulM/Q/BdJQA9boRb7gjHBcOKghfv\ne++Z/NZwXirSGuowRhQMabiWd5/I5uxTImlazUn2LimNs5FsbJ5eSfwt89M53Mxm\nQnbyy8GOVJloC+pPwesgNWdM+ld4XeFThz6JbWC9AoGBAJt5OrtUFnGjzv866Mgm\njRiWc4idC/hpTxqc7BAo+FU9bb8RPAGA1SC2hjozMwrc5eAH7QxS3E6xCvr9elBU\nQ/pTTrR+vynuDJI0s9m2B/EJFXMfAaDxoMAoGy0Nmjaq2xuJcJ3H7AQWYl24+PJg\nNIfnnY7ZuSMrpwXDL7ZNL6PT\n-----END PRIVATE KEY-----\n',
    client_email: config.client_email,
    client_id: config.client_id,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fwkx0%40covidchort3.iam.gserviceaccount.com',
  }),
  databaseURL: 'https://covidchort3.firebaseio.com',
});

module.exports = { firebaseConfig };
