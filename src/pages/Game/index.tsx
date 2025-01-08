import './game.css'
import GameChannel from '../../components/GameChannel'
import { horrorGameChannels } from '../../data/horrorGameChannels'
import { useQueries } from '@tanstack/react-query'
import { Effect } from 'effect'
import { fetchLatestVideos } from '../../api/endpoints/game'
import Loading from '../../components/common/Loading'

function Game() {
    const channelQueries = useQueries({
        queries: horrorGameChannels.map(channel => ({
            queryKey: ['videos', channel.id],
            queryFn: () => Effect.runPromise(fetchLatestVideos(channel.id)),
            
        }))
    })

    if (channelQueries.some(query => query.isLoading)) {
        return <Loading />
    }

    return (
        <div className="channelList">
            <h1>공포 게임 채널</h1>
            <div className="gameList">
                {horrorGameChannels.map((channel, index) => (
                    <GameChannel
                        key={channel.id}
                        channelId={channel.id}
                        name={channel.name}
                        channelName={channel.channel_name}
                        videos={channelQueries[index].data}
                        error={channelQueries[index].error}
                    />
                ))}
            </div>
        </div>
    )
}

export default Game 