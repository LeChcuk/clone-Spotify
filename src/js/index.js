const express = require('express');
const qs = require('querystring');

const app = express();
const client_id = '45dec37f740b449090afe4e2842e24d0';
const client_secret = '20aee07c0e274ecb9cb0c84e2da751a8';
const redirect_uri = 'https://heuristic-hamilton-e7b508.netlify.app/callback';

// scope로 지정한 항목에 한해서 Spotify server로부터 정보를 받을 수 있다.
const scope = `user-read-playback-state
                user-modify-playback-state
                user-read-private
                user-library-modify
                user-library-read
                streaming
                user-read-playback-position
                playlist-modify-private
                playlist-read-private
                playlist-modify-public
                playlist-read-collaborative
                user-read-email
                user-top-read
                user-read-currently-playing
                user-read-recently-played`;

app.set('port', process.env.PORT || 3000);

app.get('/login', (req, res) => {
    // first call '/authorize' -> 사용자 인증
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            qs.stringify({
                response_type: 'code',
                client_id,
                redirect_uri,
                scope,
            })
    );
});

app.get('/callback', (req, res) => {
    // second call '/api/token' -> 첫 번째 콜에서 응답받은 authorization code와 client secret을 전달하여
    //                              access token과 refresh token을 전달받는다.
    res.redirect('/#' + qs.stringify({}));
});

app.get('/refresh_token', (req, res) => {
    // third call '/refresh_token' -> 이전 access token이 만료되면 새로운 access token을 발급.
});

app.listen(app.get('port'), () => {
    console.log('3000번 포트에서 서버 대기 중입니다!');
});

// // footer - playbackpannel
// const footer = document.querySelector('.playbackPannel');

// // footer에 들어오는 모든 클릭 이벤트를 감지
// footer.addEventListener('click', (e) => {
//     // green-toggle해야하는 6개의 버튼이 클릭되었을 경우. toggle한다.
//     if (e.target.matches('.fa-solid--green-off') || e.target.matches('.fa-solid--green')) {
//         e.target.classList.toggle('fa-solid--green-off');
//         e.target.classList.toggle('fa-solid--green');
//     }
// });
