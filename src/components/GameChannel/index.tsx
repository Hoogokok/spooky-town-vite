import './gameChannel.css'
import { Video } from '../../api/endpoints/game'

interface GameChannelProps {
    channelId: string
    name: string
    channelName: string
}

function GameChannel({ channelId, name, channelName }: GameChannelProps) {
    const channelUrl = `https://www.youtube.com/@${name}`

    return (
        <div className="channelItem">
            <h3 className="channelName">{channelName}</h3>
            <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="channelLink"
            >
                채널 방문하기
            </a>
        </div>
    )
}

export default GameChannel 