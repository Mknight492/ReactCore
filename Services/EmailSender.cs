using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ReactCore.Services
{
    public class EmailSender: IEmailSender
    {
        public IConfiguration Configuration { get; set; }
        public string Email { get; private set; }
        public string EmailPassword { get; private set; }
        public EmailSender(IConfiguration configuration)
        {
            Configuration = configuration;
            Email = Configuration.GetSection("AppSettings")["Email"];
            EmailPassword = Configuration["EmailPassword"];
        }
        


        public Task SendEmailAsync(string email, string subject, string message)
        {
            SmtpClient client = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(Email, EmailPassword),
                EnableSsl = true

            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(Email)
            };
            mailMessage.To.Add(email);
            mailMessage.Body = message;
            mailMessage.IsBodyHtml = true;
            mailMessage.Subject = subject;
            client.Send(mailMessage);
            return Task.CompletedTask;
        }
    }
}
