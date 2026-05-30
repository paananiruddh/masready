# GoDaddy DNS Configuration

## Apex Domain — masready.com.au → GitHub Pages

Add these 4 A records in GoDaddy DNS:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |

## www Redirect

Use GoDaddy Forwarding (not a CNAME) to 301-redirect www to apex:

- Forward from: `www.masready.com.au`
- Forward to: `https://masready.com.au`
- Type: 301 Permanent
- Forward only (not masking)

## Azure Customer Subdomains

For each Azure-hosted customer subdomain:

| Type | Name | Value |
|------|------|-------|
| CNAME | `mas9power` | `your-azure-app.azurestaticapps.net` |
| TXT | `asuid.mas9power` | *(Azure domain verification token)* |

## GitHub Pages Custom Domain

After DNS propagates:
1. Go to GitHub repo → Settings → Pages
2. Set Custom domain: `masready.com.au`
3. Enable Enforce HTTPS

## Notes

- DNS propagation: 10–30 minutes (up to a few hours)
- Check propagation at dnschecker.org
