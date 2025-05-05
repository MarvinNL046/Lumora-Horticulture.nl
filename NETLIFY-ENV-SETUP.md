# Setting Up Environment Variables in Netlify

This document provides guidance on setting up required environment variables for the Lumora Horticulture website on Netlify.

## Required Environment Variables for EmailJS

To ensure the contact forms work correctly in production, you need to add the following environment variables to your Netlify project:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | `3gYjZAIjBRxoyelUO` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | `service_42szdlq` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | `template_b5c14j1` |

## Steps to Add Environment Variables in Netlify

1. Log in to your Netlify Dashboard
2. Select your Lumora Horticulture site
3. Go to **Site Settings**
4. In the left sidebar, click on **Environment variables**
5. Click on **Add a variable**
6. Add each of the variables listed above
7. Make sure to click **Save** after adding all variables

## Verifying the Setup

After deploying with these environment variables, you should:

1. Test both contact forms on the live site
2. Verify that emails are being received correctly with all fields (name, email, phone, message)
3. Check that the form responses work as expected

## Troubleshooting

If emails are not being sent from the production site:

1. Check the browser console for any errors related to EmailJS
2. Verify that the environment variables have been correctly set in Netlify
3. Make sure the EmailJS template is properly configured with all expected fields

## Template Structure

Make sure your EmailJS template includes the following variables to display all form fields:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>Een bericht van {{name}} is ontvangen door <strong>Lumora Horticulture</strong>. Gelieve zo spoedig mogelijk te reageren.</div>
  <div style="margin-top: 20px; padding: 15px 0; border-width: 1px 0; border-style: dashed; border-color: lightgrey;">
    <table role="presentation" style="width: 100%">
      <tr>
        <td style="vertical-align: top; width: 40px;">
          <div style="padding: 6px 10px; margin: 0 10px; background-color: #e6f2ea; border-radius: 5px; font-size: 26px;" role="img">🌱</div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px"><strong>{{name}}</strong></div>
          <div style="color: #999999; font-size: 13px">{{time}}</div>
          
          <!-- Contact information -->
          <div style="margin-top: 10px; font-size: 14px;">
            <strong>E-mail:</strong> {{email}}<br>
            <strong>Telefoon:</strong> {{phone}}<br>
          </div>
          
          <p style="font-size: 16px; margin-top: 12px;">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
