import './gameChannel.css'
import { Video } from '../../api/endpoints/game'
import ErrorComponent from '../common/ErrorComponent'

interface GameChannelProps {
    channelId: string
    name: string
    channelName: string
    videos?: Video[]
    error?: unknown
}

function GameChannel({ channelId, name, channelName, videos, error }: GameChannelProps) {
    const channelUrl = `https://www.youtube.com/@${name}`

    if (error) {
        return <ErrorComponent code="FetchError" message="비디오를 불러오는데 실패했습니다" />
    }

    return (
        <div className="channelItem">
            <h3 className="channelName">{channelName}</h3>
            <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="channelLink">
                채널 방문하기
            </a>
            {videos && videos.length > 0 && (
                <div className="videoList">
                    {videos.map(video => (
                        <div key={video.id.videoId} className="videoItem">
                            <div className="thumbnailContainer">
                                <img
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                    className="thumbnail"
                                />
                            </div>
                            <div className="videoInfo">
                                <h4 className="videoTitle">{video.snippet.title}</h4>
                                <p className="videoDescription">
                                    {video.snippet.description.slice(0, 100)}...
                                </p>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="videoLink"
                                >
                                    영상 보기
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GameChannel 