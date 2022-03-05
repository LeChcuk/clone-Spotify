기술 스택 : Sass(7-1 pattern), BEM, Node.js

개선 요망 1) Responsive layout, fonts (sass style)
        2) Spotify API 적용
        3) JS 이벤트 적용

em -> parent에 종속적인 상대적 크기. 보통 1em = 16px
  (e.g.) parent에 8em을 지정했다면, parent는 16 * 8 = 128px이다. 이 때 child에 0.5em을 지정하면 128 * 0.5 = 64px이 적용된다. 즉, %와 유사함. %도 parent에 종속적. em은 font-size에 영향을 받는 차이.

rem -> root em. 부모가 아닌 root에 지정된 값에 종속적.
  (e.g.) root에 16px이 지정되어 있다고 할 때. parent 8rem -> 16 * 8 = 128px. child 0.5rem -> 16 * 0.5 = 8px

rem은 특정 컴포넌트 밖에서 쓰일때와, 안에서 쓰일 때 크기가 동일하다. em은 컴포넌트별로 크기가 달라질 수 있다. 이렇게 필요에 따라 rem, em을 사용하면 된다.

html 태그가 여러번 중첩된 구조에 em을 사용하면 크기 계산이 복잡하다.

padding, margin 같은 값이 font-size(em)에 따라 유동적으로 변경되어야 한다면 em을 사용하는 것이 좋다. em과 rem을 적절하게 혼용.


### responsive typography

font-size 값을 변수로 할당하고, 미디어 쿼리를 이용해서 특정 구간이되면 변수에 할당된 값을 변경하는 방식.


### Sass 반응형

1) @mixin + @media + @content를 이용. 미디어쿼리

html 2880
body 2880
div.main 2880
div.mainViewContainer 2880
header 2880
div.header__div 2816 + padding-left 32 + padding-right 32