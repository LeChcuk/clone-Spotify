// 1) npm run start -> node index.js 서버 가동
// 2) localhost:3000/login -> Spotify API -> (redirected) netlify/callback
// netlify callback 페이지가 구현되어 있지 않기 때문에 에러 발생
// netlify App에 /callback page를 추가하기.

const express = require('express');
const res = require('express/lib/response');
const { nextTick } = require('process');
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

const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const state = generateRandomString(16);

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('hi');
});

app.get('/login', (req, res, next) => {
    // first call '/authorize' -> 사용자 인증
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
            qs.stringify({
                response_type: 'code',
                client_id,
                redirect_uri,
                scope,
                state,
            })
    );
});

app.get('/callback', (req, res, next) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
        res.redirect(
            '/#' +
                qs.stringify({
                    error: 'state_mismatch',
                })
        );
    } else {
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code,
                redirect_uri,
                grant_type: 'authorization_code',
            },
            headers: {
                Authorization:
                    'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
            },
            json: true,
        };

        req.post(authOptions, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                // 에러없이 성공한 경우
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;
                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { Authorization: 'Bearer ' + access_token },
                    json: true,
                };

                // use the access token to access the Spotify Web API
                req.get(options, function (err_inner, response_inner, body_inner) {
                    console.log(body_inner);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect(
                    '/#' +
                        qs.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token,
                        })
                );
            } else {
                res.redirect(
                    '/#' +
                        qs.stringify({
                            error: 'invalid_token',
                        })
                );
            }
        });
    }

    // second call '/api/token' -> 첫 번째 콜에서 응답받은 authorization code와 client secret을 전달하여
    //                              access token과 refresh token을 전달받는다.
    res.redirect('/#' + qs.stringify({}));
});

app.get('/refresh_token', (req, res) => {
    // third call '/refresh_token' -> 이전 access token이 만료되면 새로운 access token을 발급.
    res.send('yap');
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
