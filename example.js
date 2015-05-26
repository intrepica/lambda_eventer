var lambda = require("./index");

lambda.handler({
  "user_id": "30",
  "email": "test@serenity.io",
  "name": "Hoban Washburne",
  "signed_up_at": 1392731331,
  "last_seen_ip" : "1.2.3.4",
  "last_seen_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9",
  "custom_attributes": {
    "paid_subscriber" : true,
    "monthly_spend": 155.5,
    "team_mates": 10
  }}, {
    fail: function(err) {
      console.log(err);
    },
    succeed: function(res) {
      console.log(res);
    }
  });

