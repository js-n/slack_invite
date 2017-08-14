const { WebClient } = require('@slack/client')

const TOKEN = process.env['SLACK_TOKEN']
if (!TOKEN) { throw new Error('Missing env var: SLACK_TOKEN')}
const CHANNEL = process.env['CHANNEL']
if (!CHANNEL) { throw new Error('Missing env var: CHANNEL')}

const client = new WebClient(TOKEN)

async function getAllUsers() {
  const response = await client.users.list()
  return response.members
}

async function getAllChannels() {
  const response = await client.channels.list()
  return response.channels
}

async function getChannelByName(name) {
  const channels = await getAllChannels()
  const channel = channels.find(c => c.name == name)
  if (!channel) throw new Error('no such channel: ' + name)
  return channel
}

async function inviteToChannel(userId, channelId) {
  try {
    const invitation = await client.channels.invite(channelId, userId)
  }   catch (e) {
    return e.message
  }
  return 'ok'
}

async function main () {
  const users = await getAllUsers()
  const channel = await getChannelByName(CHANNEL)
  const results = await Promise.all(users.map(user =>
    inviteToChannel(user.id, channel.id).then(result => [user, result])
  ))
  results.forEach(([user, result]) => { console.log(user.id, user.name, result) })
  console.log('counts', results.reduce((acc, [_, result]) => {
    acc[result] = acc[result] || 0
    acc[result]++
    return acc
  }, {}))
  console.log('done')
}

main()
