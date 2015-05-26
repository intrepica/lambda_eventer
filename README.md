An AWS Lambda function for posting an AWS SNS event message to an external service as JSON.

```sh
$ curl https://api.intercom.io/users \
-X POST \
-u xxx:xxx \
-H 'Accept: application/json' \
-H 'Content-Type: application/json' -d '
{
  "user_id": "25",
  "email": "wash@serenity.io",
  "name": "Hoban Washburne",
  "signed_up_at": 1392731331,
  "last_seen_ip" : "1.2.3.4",
  "last_seen_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",
  "custom_attributes": {
    "paid_subscriber" : true,
    "monthly_spend": 155.5,
    "team_mates": 9
  },
  "companies": [
    {
      "company_id" : "366",
      "name" : "Serenity",
      "monthly_spend" : 500
    }
  ]
}'
```