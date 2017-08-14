# slack_invite

a script to bulk-invite slack users to a channel

## Requirements:
- node.js 8
- a slack API token with scopes `users:read`, `channels:read`, and `channels:write`

## usage
1. clone this repo
2. `npm install`
3. `SLACK_TOKEN=<token> CHANNEL=<channel> node .`

## example output
```
 > SLACK_TOKEN=xoxp-219475334657-0000000000-221260355776-59e9b379c4ac6590fbb25c2a8e6446c9 CHANNEL=random node .
error: Response not OK:  cant_invite_self
error: Response not OK:  already_in_channel
error: Response not OK:  already_in_channel
error: Response not OK:  cant_invite
error: Response not OK:  already_in_channel
U6G458U3F alan ok
U6FFZJQ6M beatriz ok
U6G6QQ8E9 carlos already_in_channel
U6G3YRFMJ daniel cant_invite_self
U6GPR5FBP eudocia already_in_channel
U6FEGRU8H fulano already_in_channel
USLACKBOT slackbot cant_invite
counts { ok: 2, already_in_channel: 3, cant_invite_self: 1, cant_invite: 1 }
done
```

lines starting with `error: ` represent a single failure, with the reason it failed. possible failures are listed at https://api.slack.com/methods/channels.invite#errors

