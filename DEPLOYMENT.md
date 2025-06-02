# Knowlio - Deployment Guide

This guide will help you deploy your Knowlio React application to AWS S3 with Cognito authentication.

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Node.js** and npm installed
4. **S3 Bucket** configured for static website hosting
5. **AWS Cognito User Pool** (optional, for authentication)

## 1. AWS S3 Bucket Setup

### Create S3 Bucket
```bash
aws s3 mb s3://your-knowlio-bucket-name
```

### Configure Bucket for Static Website Hosting
```bash
aws s3 website s3://your-knowlio-bucket-name \
  --index-document index.html \
  --error-document index.html
```

### Set Bucket Policy for Public Access
Create a file `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-knowlio-bucket-name/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy \
  --bucket your-knowlio-bucket-name \
  --policy file://bucket-policy.json
```

## 2. AWS Cognito Setup

### Create User Pool
1. Go to AWS Cognito Console
2. Create a new User Pool with these settings:
   - Sign-in options: Email
   - Password policy: Your preference
   - MFA: Optional but recommended
   - User account recovery: Email

### Configure App Client
1. In your User Pool, go to "App clients"
2. Create a new app client:
   - App client name: knowlio-web
   - Generate client secret: No (for SPA)
   - Enable: ALLOW_USER_PASSWORD_AUTH, ALLOW_REFRESH_TOKEN_AUTH

### Set Up Hosted UI (Optional)
1. Go to "App client settings"
2. Enable Cognito User Pool as identity provider
3. Set callback URLs:
   - http://localhost:3000/
   - https://your-s3-bucket-url/
4. Set sign-out URLs: Same as above
5. OAuth 2.0 settings:
   - Authorization code grant
   - Implicit grant
   - Scopes: openid, email, profile

## 3. Configure the Application

### Update Cognito Configuration
Edit `src/App.js` and replace the placeholder values:

```javascript
const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_XXXXXXXXX',
      userPoolClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
      identityPoolId: 'us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', // Optional
      loginWith: {
        oauth: {
          domain: 'your-domain.auth.us-east-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['http://localhost:3000/', 'https://your-s3-bucket.s3-website-us-east-1.amazonaws.com/'],
          redirectSignOut: ['http://localhost:3000/', 'https://your-s3-bucket.s3-website-us-east-1.amazonaws.com/'],
          responseType: 'code',
        }
      }
    }
  }
};
```

Then uncomment the line:
```javascript
Amplify.configure(awsConfig);
```

### Update Login Component
In `src/pages/Login.js`, uncomment the Cognito import and authentication code.

## 4. Build and Deploy

### Update Deploy Script
Edit `scripts/deploy-to-s3.sh` and update:
```bash
BUCKET_NAME="your-knowlio-bucket-name"
DISTRIBUTION_ID="YOUR_CLOUDFRONT_DISTRIBUTION_ID" # Optional
```

### Deploy to S3
```bash
# Make sure the script is executable
chmod +x scripts/deploy-to-s3.sh

# Run the deployment
./scripts/deploy-to-s3.sh
```

## 5. CloudFront Setup (Recommended)

For better performance and HTTPS support:

1. Create CloudFront distribution
2. Set origin to your S3 bucket
3. Configure behaviors:
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Allowed HTTP Methods: GET, HEAD, OPTIONS
4. Set custom error pages:
   - 403 → /index.html (200 response)
   - 404 → /index.html (200 response)

## 6. Custom Domain (Optional)

1. Register domain in Route 53 or external registrar
2. Create SSL certificate in ACM (us-east-1 region)
3. Configure CloudFront with custom domain
4. Set up Route 53 alias record to CloudFront

## Security Best Practices

1. **Enable MFA** for Cognito users
2. **Use CloudFront** for HTTPS and caching
3. **Set up WAF** for additional protection
4. **Enable S3 versioning** for rollback capability
5. **Use IAM roles** with least privilege
6. **Enable CloudTrail** for audit logging

## Monitoring and Maintenance

1. **CloudWatch**: Monitor API calls and errors
2. **S3 Access Logs**: Track website access
3. **Cognito Analytics**: Monitor user sign-ups and sign-ins
4. **Budget Alerts**: Set up cost monitoring

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Check Cognito app client callback URLs
2. Verify S3 bucket CORS configuration
3. Ensure CloudFront forwards required headers

### 404 Errors on Refresh
For client-side routing to work:
1. Set S3 error document to index.html
2. Configure CloudFront custom error pages

### Authentication Issues
1. Verify Cognito configuration
2. Check browser console for errors
3. Ensure tokens are being stored properly

## Cost Optimization

1. **S3**: Use lifecycle policies for old builds
2. **CloudFront**: Configure appropriate cache headers
3. **Cognito**: Monitor active users
4. **Use AWS Free Tier** where applicable

## Support

For issues or questions:
- Check AWS documentation
- Review CloudWatch logs
- Contact AWS support if needed
