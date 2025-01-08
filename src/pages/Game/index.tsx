import './game.css'
import GameChannel from '../../components/GameChannel'
import { horrorGameChannels } from '../../data/horrorGameChannels'

function Game() {
    return (
        <div className="channelList">
            <h1>공포 게임 채널</h1>
            {horrorGameChannels.map((channel) => (
                <GameChannel
                    key={channel.id}
                    channelId={channel.id}
                    name={channel.name}
                    channelName={channel.channel_name}
                />
            ))}
        </div>
    )
}

export default Game 