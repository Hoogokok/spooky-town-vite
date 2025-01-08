import React from 'react'
import './profile.css'

function Profile() {
    return (
        <div className="profileContainer" role="main">
            <div className="profileTitle">프로필</div>

            <section className="profileSection">
                <div className="profileInfo">
                    <div className="profileAvatar">
                        <img src="/icons/profile.svg" alt="프로필 아바타" />
                    </div>
                    <div className="profileDetails">
                        <h2 className="profileName">사용자 이름</h2>
                        <p className="profileEmail">user@example.com</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile 