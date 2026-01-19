import smtplib
import os
from dotenv import load_dotenv
from email.mime.text import MIMEText

load_dotenv()

email_user = os.environ.get('EMAIL_HOST_USER')
email_pass = os.environ.get('EMAIL_HOST_PASSWORD')

print(f"Authenticating as: {email_user}")

# Create a proper email object (Titan requires this structure)
msg = MIMEText("This is a test email from your Django setup.")
msg['Subject'] = "Titan Email Test"
msg['From'] = email_user
msg['To'] = email_user

try:
    # Connect to Titan on SSL port 465
    server = smtplib.SMTP_SSL('smtp.titan.email', 465)
    server.login(email_user, email_pass)
    print("✅ Login Successful!")
    
    # Send the email
    server.send_message(msg)
    print("✅ Email Sent Successfully!")
    server.quit()

except Exception as e:
    print(f"❌ Error: {e}")