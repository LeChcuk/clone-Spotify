const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Hello Woooorld');
});

app.listen(app.get('port'), () => {
    console.log('3000번 포트에서 서버 대기 중입니다!');
});

// footer - playbackpannel
const footer = document.querySelector('.playbackPannel');

// footer에 들어오는 모든 클릭 이벤트를 감지
footer.addEventListener('click', (e) => {
    // green-toggle해야하는 6개의 버튼이 클릭되었을 경우. toggle한다.
    if (e.target.matches('.fa-solid--green-off') || e.target.matches('.fa-solid--green')) {
        e.target.classList.toggle('fa-solid--green-off');
        e.target.classList.toggle('fa-solid--green');
    }
});
