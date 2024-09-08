---
 id: "4"
 title: "test3"
 subTitle: "웹페이지도 일종의 문서이다. 이 문서는 웹 브라우저를 통해 그 내용이 해석되어 웹 브라우저 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다.
DOM 은 웹 페이지의 객체 지향 표현이며, JavaScript와 같은 스크립팅 언어를 이용해 DOM 을 수정할 수 있다."
 tags: ["React"]
 tabMenu: "개발"
 date: "2024년 09월 01일"
---

> <span style="color: red;">⚠️ 공부한 내용을 멋대로 기록한 것입니다. 작성된 정보는 순 엉터리정보일 수 있으니 참고하실 때 조심하세요.</span>
> <span style="color: black;">모던 리액트 Deep dive 책을 참고하여 작성하였습니다.</span>

</br>

## DOM과 브라우저 렌더링 과정

>> ### DOM이 무엇인가 ? 
DOM이란 웹페이지에 대한 인터페이스로 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보를 담고 있는 것을 말한다.

웹페이지도 일종의 문서이다. 이 문서는 웹 브라우저를 통해 그 내용이 해석되어 웹 브라우저 화면에 나타나거나 HTML 소스 자체로 나타나기도 한다.
DOM 은 웹 페이지의 객체 지향 표현이며, JavaScript와 같은 스크립팅 언어를 이용해 DOM 을 수정할 수 있다.

DOM은 트리구조로 되어있는데 이런 트리는 브라우저가 웹사이트 접근 요청을 받고 화면을 그리는 과정에서 생성되는데 이를 알아보고자 한다.

브라우저가 렌더링되는 과정은 아래의 순서대로 진행된다.

</br>

<b>1. 브라우저가 사용자가 요청한 주소를 방문해 HTML 파일을 다운로드한다. </b>

<b>2. 브라우저의 렌더링 엔진은 HTML을 파싱해 DOM 노드로 구성된 트리(DOM)을 만든다.</b>

<b>3. 2번 과정에서 CSS 파일을 만나면 해당 CSS 파일도 다운로드한다.</b>

<b>4. 브라우저의 렌더링 엔진은 이 CSS도 파싱해 CSS 노드로 구성된 트리(CSSOM)를 만든다.</b>

<b>5. 브라우저는 2번에서 만든 DOM 노드를 순회하는데, 여기서 모든 노드를 방문하는 것이 아니고 사용자 눈에 보이는 노드만 방문한다. 이는 트리를 분석하는 과정을 조금이라도 빠르게 하기 위해서다.</b>

<b>6. 5번에서 제외된, 눈에 보이는 노드를 대상으로 해당 노드에 대한 CSSOM 정보를 찾고 여기서 발견된 CSS 스타일 정보를 이 노드에 적용한다. </b>

</br>


![](https://velog.velcdn.com/images/jutrong/post/91c0fc1d-3472-4223-b90e-904ccde22877/image.png)

최종 출력은 화면에 표시되는 모든 콘텐츠의 콘텐츠와 스타일 정보를 모두 포함하는 렌더링 트리이다. 렌더링 트리가 준비되면 '레이아웃' 단계를 진행할 수 있다.
![](https://velog.velcdn.com/images/jutrong/post/0d334333-0c0f-4515-bb95-e339378029a8/image.png)
레이아웃 프로세스의 출력은 '상자 모델'로, 표시 영역 내 각 요소의 정확한 위치와 크기를 정확하게 캡처한다.

모든 상대적인 측정값은 화면의 절대적인 픽셀로 변환된다.

마지막으로, 이제 표시되는 노드와 노드의 계산된 스타일 및 기하학적 형태를 알았으므로 이 정보를 최종 단계로 전달할 수 있다. 그러면 렌더링 트리의 각 노드를 화면의 실제 픽셀로 변환할 수 있다. 


이 단계를 흔히 **'페인팅'** 또는 **'래스터화'** 라고 한다.

렌더링 트리 생성, 레이아웃 및 페인트를 수행하는 데 필요한 시간은 문서 크기, 적용된 스타일, 해당 문서가 실행되는 기기에 따라 다르다. 문서가 클수록 브라우저에서 더 많은 작업을 수행하며, 스타일이 더 복잡할수록 페인팅에 더 많은 시간이 걸린다.

브라우저 렌더링 과정을 짧게 다시 요약하자면

1. HTML 마크업을 처리하고 DOM 트리를 빌드
2. CSS 마크업을 처리하고 CSSOM 트리를 빌드
3. DOM 및 CSSOM을 렌더링 트리로 결합
4. 렌더링 트리에서 레이아웃을 실행하여 각 노드의 도형을 계산
5. 개별 노드를 화면에 페인팅
## virtual DOM
### 가상돔이 무엇일까?
가상DOM은 실제 브라우저의 DOM이 아닌 리액트가 관리하는 가상의 DOM을 의미한다. 가상 DOM은 웹페이지가 표시해야 할 DOM을 일단 메모리에 저장하고 리액트가 실제 변경에 대한 준비가 완료되었을 때 실제 브라우저의 DOM에 반영한다.


> ### 그러면 왜 React에서는 가상DOM을 사용할까 ? 
SPA(Single Page Application)는 일반적인 웹페이지와는 다르게 하나의 페이지에서 계속해서 요소의 위치를 재계산해야한다. 요소를 바꾼다는 것은 레이아웃이 일어나고, 이 레이아웃은 필연적으로 리페인팅이 발생하기 때문에 많은 비용이 든다.
DOM 계산을 브라우저가 아닌 메모리에서 계산하는 과정을 한 번 거치게 된다면 실제로는 여러 번 발생했을 렌더링 과정을 최소화할 수 있다.

![](https://velog.velcdn.com/images/jutrong/post/1446da0e-ac7a-4133-b1ae-e1fb7356798a/image.png)
virtual DOM은 변화된 부분만 가려내어 실제 DOM에 전달하기에 실제 DOM은 1회로 인식하여 단 한번만의 렌더링 과정만 거치게 된다.


React는 대규모 SPA와 다이나믹 UI의 웹 페이지를 만들기 위해서 존재하며, 만약 규모가 작고 정적인 이전의 웹 애플리케이션이라면 일반 DOM이 성능 이 더 좋다. 상황에 따라 어느 쪽이 좋은지 다를 수 있다는 것이다.


## 리액트에 있는 라이프사이클과 각 라이프사이클의 역할

라이프 사이클을 다루는 것은 컴포넌트가 생겨나고, 변화하고, 없어지는 일련의 프로세스를 프로그래머가 통제하는 것을 뜻한다. 
생성자를 통해서 필요한 메모리를 할당하고, 객체의 역할이 끝나면 소멸자를 통하여 메모리를 반환한다. 컴퓨터의 자원은 한정적이기 때문에 역할이 끝나면 모든 메모리를 반환해야 메모리 누수에 대한 문제가 생기지 않고, 더 좋은 성능을 발휘할 수 있다.

라이프 사이클이 있는 이유는 메모리 비우기가 가장 큰 이유이다.

![](https://velog.velcdn.com/images/jutrong/post/24db34b2-b2e5-4bcb-a2ab-6218a9df430f/image.png)

**먼저 마운트(mount), 즉 컴포넌트가 생성될 때 어떠한 생명주기 메서드가 존재하고 무슨 역할을 하는지 알아보자.**

- constructor

constructor는 컴포넌트의 생성자 메서드. 컴포넌트가 만들어지면 가장 먼저 실행되는 메서드이다. 
이 메서드에서는 초기 state를 정할 수 있다.

```jsx
// constructor 기본 구조
class MyComponent() extends React.Component{
  constructor(props){
    super(props)
    //...
  }
}
// super 함수를 호출해야 React.Component class의 method가 호출 됩니다. 
// super를 호출하지 않으면 컴포넌트는 작동하지 않습니다.
```

- getDerivedStateFromProps()

getDerivedStateFromProps 는 props 로 받아온 것을 state 에 넣어주고 싶을 때 사용한다. 컴포넌트가 마운트 될 때와 업데이트 될 때 호출
다른 생명주기 메서드와는 달리 앞에 static을 필요로 하고, 이 안에서는 this 롤 조회 할 수 없다.

```jsx
class Example extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.value !== prevState.value) {
      return { value: nextProps.value}
      }
      return null
   }
}
```

- render()

컴포넌트 렌더링할 때 필요한 메서드 중 유일한 필수 메서드이다. constructor메소드가 실행된 이후에는 render 메소드가 실행된다.
이 메소드가 실행되면서 JSX가 HTML로 변환되어 우리가 보는 웹 브라우저에 나타나게 된다. 
한가지 명심해야 할 점은, render메소드는 컴포넌트가 로딩될 때에도 실행되지만 컴포넌트의 데이터 (state, props)가 업데이트 되었을 때에도 동작한다는 점. 그렇기 때문에, render 메소드에서 setState나 props를 변화시키는 메소드를 가능하면 수행하지 않는 것을 추천(render() 함수는 항상 순수해야 하며 부수 효과가 없어야 한다)

- componentDidMount()

이 함수는 컴포넌트가 마운트되고 준비되는 즉시 실행된다. render와는 다르게 이 함수 내부에서는 this.setState()로 state 값을 변경하는 것이 가능하다.
DOM 을 사용해야하는 외부 라이브러리 연동을 하거나, 해당 컴포넌트에서 필요로하는 데이터를 요청하기 위해 axios, fetch 등을 통하여 ajax 요청을 하거나, DOM 의 속성을 읽거나 직접 변경하는 작업을 진행

### 업데이트를 발생시키는 4가지 상황
1. props가 변경될 때
2. state가 변경될 때
3. 부모 컴포넌트가 리렌더링될 때
4. this.forceUpdate로 강제로 렌더링을 trigger하는 경우


- getDerivedStateFromProps() 

마운트 단계와 동일하며 컴포넌트의 props 나 state 가 바뀌었을때도 이 메서드가 호출된다.

- shouldComponentUpdate()

state나 props의 변경을 리액트 컴포넌트가 다시 리렌더링되는 것을 막고 싶다면 이 생명주기 메서드를 사용. 
이 메서드에서는 반드시 true나 false를 반환. 조건에 따라 false를 반환하면 해당 조건에는 render 함수를 호출하지 않는다. 

Hook에선 보통 props는 React.memo, state는 useMemo를 활용하면 렌더링 성능을 개선할 수 있다.

- render()
 
- getSnapshotBeforeUpdate()

DOM이 업데이트되기 직전에 호출된다. 여기서 반환되는 값은 componentDidUpdate로 전달된다. DOM에 렌더링되기 전에 윈도우 크기를 조절하거나 스크롤 위치를 조정하는 등의 작업를 처리하는데 유용하다.

함수형에서는 아직 이 기능을 대체할만한 hook이 없다고 한다.

- componentDidUpdate()

컴포넌트 업데이트가 일어난 이후 바로 실행된다. 일반적으로 state나 props의 변화에 따라 DOM을 업데이트하는 등에 쓰인다.
render메소드가 실행되어 업데이트 된 state , props 와 업데이트 되기 전인 state, props 를 가지고 비교 작업을 가능하게 해준다.

**Unmounting은 DOM에서 제거되는 것을 뜻한다. JSX에 포함되었다가 이후에 제거되는 경우에 발생.**

- ComponentWillUnmount()

타이머를 제거하거나, DOM 요소를 정리하거나, 이벤트를 지우거나, api호출을 취소할 때 componentDidMount에서 연결한 이벤트를 제거할 수 있다. 컴포넌트가 화면에서 사라지기 직전에 호출.

## Class Component와 Function Component의 차이점

### 생명주기 메서드의 부재
함수형 컴포넌트는 props를 받아 단순히 리액트 요소만 반환하는 함수인 반면, 클래스형 컴포넌트는 render 메서드가 있는 React.Component를 상속받아 구현하는 자바스크립트 클래스이기 때문이다.

즉, 생명주기 메서드는 React.Component에서 오는 것이기 때문에 클래스형 컴포넌트가 아닌 이상 생명주기 메서드를 더는 사용할 수 없다는 뜻이다. 

useEffect 훅을 사용해 생명주기 메서드를 비슷하게 구현할 수 있다. '비슷'할뿐이지 똑같다는 것은 아니다.

### 함수형 컴포넌트와 렌더링된 값
함수형 컴포넌트는 렌더링된 값을 고정하고, 클래스형 컴포넌트는 그렇지 못하다. 
함수형 컴포넌트는 렌더링이 일어날 때마다 그 순간의 값인 props와 state를 기준으로 렌더링된다. props와 state가 변경된다면, 다시 한 번 그 값을 기준으로 함수가 호출된다고 볼 수 있다. 반면 클래스형 컴포넌트는 시간의 흐름에 따라 변화하는this를 기준으로 렌더링 된다.



## Class Component의 한계

### 데이터의 흐름을 추적하기 어렵다.

서로 다른 여러 메서드에서 state의 업데이트가 일어날 수 있으며, 또 코드 작성 시 메서드의 순서가 강제돼 있는 것이 아니기 때문에 사람이 읽기가 매우 어렵다. 
state가 어떤 식의 흐름으로 변경돼서 렌더링이 일어나는지 혹은 일어나지 않는지 판단하기 어렵다.

### 애플리케이션 내부 로직의 재사용이 어렵다.

공통 로직이 많아질수록 이를 감싸는 고차 컴포넌트 내지는 props가 많아지는 래퍼 지옥에 빠져들 위험성이 커진다.
애플리케이션 규모가 커질수록 재사용할 로직이 많아지는데, 이를 클래스형 컴포넌트 환경에서 매끄럽게 처리하기란 쉽지 않다. 물론 extends, PureComponent와 같이 컴포넌트를 상속해서 중복 코드를 관리할 수 있지만, 이 역시 상속되고 있는 클래스의 흐름을 쫓아야 하기 때문에 복잡도가 증가하고 코드의 흐름을 좇기가 쉽지 않다.

### 기능이 많아질수록 컴포넌트의 크기가 커진다.

생명주기 메서드 사용이 잦아지는 경우 컴포넌트의 크기가 기하급수적으로 커지는 문제가 발생한다.

### 클래스는 함수에 비해 상대적으로 어렵다.

많은 자바스크립트 개발자는 클래스보다는 함수에 더 익숙하다. 

### 코드 크기를 최적화하기 어렵다.

클래스형 컴포넌트는 최종 결과물인 번들 크기를 줄이는 데에도 어려움을 겪는다.

### 핫 리로딩 하는 데 상대적으로 불리하다. 

핫리로딩이란 코드에 변경 사항이 발생했을 때 앱을 다시 시작하지 않고서도 해당 변경된 코드만 업데이트해 변경 사항을 빠르게 적용하는 기법이다.

이러한 다양한 클래스형 컴포넌트의 한계를 극복하기 위해 리액트는 클래스형 컴포넌트를 완전히 대신할 수 있도록 기존의 무상태 함수형 컴포넌트에 상태를 더할 수 있는 훅을 출시해 함수형 컴포넌트를 많은 사람들이 사용하게끔 유도한다.

사실 함수형 컴포넌트가 많은 사람이 사용할 시기에 리액트를 배워서 클래스형 컴포넌트에 대한 불편함은 아직 겪어보지 않아서 모르는 상태이다. 

나중에 내가 클래스형 컴포넌트를 만질 때가 오면 생명주기 메서드에 대한 이해가 더 필요할 것 같고 실제 코드를 접해야 이해할 수 있을 것 같다.

## 리액트 렌더링 일어나는 이유

리액트에서의 렌더링은 브라우저의 렌더링의 의미와 다르다. 
> #### 리액트에서 렌더링이란 
리액트 어플리케이션 트리 안에 있는 모든 컴포넌트들이 현재 자신들이 가지고 있는 props와 state의 값을 기반으로 어떻게 UI를 구성하고 이를 바탕으로 어떤 DOM 결과를 브라우저에 제공할 것인지 계산하는 일련의 과정을 의미한다.

### 렌더링이 언제 발생하는가?

리액트를 공부하고 시간이 지났지만 렌더링되는 조건을 희미하게 알고 있었다. 부끄럽게도 최근들어서야 deep dive책을 읽으면서 리렌더링 조건을 알 수 있었다. 아직 성능 저하를 겪을만한 프로젝트를 진행하지 않아서 그런지 최적화를 통해서 성능저하를 막아보자(?)라는 필요성을 못느끼고 있지만 그래도 리액트를 공부하는 입장에서 필수로 알아야 할 개념이 아닌가 생각이들어 렌더링이 언제 일어나는지에 대해 알아보려한다.

**1. 클래스형 컴포넌트의 setState가 실행되는 경우**  

state의 변화는 컴포넌트 상태의 변화를 의미한다. 
클래스형 컴포넌트에서는 state변화를 setState 호출을 통해 수행하므로 리렌더링이 발생한다.

</br>

**2. 클래스형 컴포넌트의 forceUpdate가 실행되는 경우**  

render가 state나 props가 아닌 다른 값에 의존하고 있어 리렌더링을 자동으로 실행할 수 없을 경우 forceUpdate를 실행해 리렌더링을 일으킬 수 있다.


</br>


**3. 함수형 컴포넌트의 useState()의 두 번째 배열 요소인 setter가 실행되는 경우**


</br>


**4. 함수형 컴포넌트의 useReducer()의 두 번째 배열 요소인 dispatch가 실행되는 경우**

</br>

**5. 컴포넌트의 key props가 변경되는 경우**

key의 변화는 리렌더링을 야기한다. 
일반적으로 key는 배열에서 하위 컴포넌트를 선언할 때 사용된다.
리액트에서 key는 리렌더링이 발생하는 동안 형제 요소들 사이에서 동일한 요소를 식별하는 값이다. 

</br>

**6. props가 변경되는 경우**

</br>

**7. 부모 컴포넌트가 렌더링 될 경우**

부모 컴포넌트가 리렌더링된다면 자식 컴포넌트도 무조건 리렌더링이 일어난다.

</br>


## 렌더와 커밋


리액트의 공식 문서에 의하면 리액트의 렌더링은 2가지 렌더링으로 구분된다.

- 컴포넌트 렌더링: 컴포넌트를 실행하여 리액트 엘리먼트(ReactElement)를 리턴하는 것
- 엘리먼트 렌더링: 엘리먼트를 DOM에 반영하는 것. 이 과정에서 fiber(React V15 이전에는 Virtual DOM)를 구성 및 업데이트하고, 재조정(Reconciliation) 과정을 거쳐서 변경된 부분만 DOM을 업데이트 (Commit in https://beta.reactjs.org/learn/render-and-commit)

그리고, 리액트에는 렌더 단계(render phase)와 커밋 단계(commit phase)의 두 단계가 있다. 2 가지 렌더링과 2 가지 단계는 서로 일치하지 않는다. 

- Render 단계 : 컴포넌트를 렌더링하고 변경 사항을 계산하는 모든 작업, 렌더링 프로세스에서 컴포넌트를 실행해 이 결과와 이전 가상 DOM을 비교하는 과정을 거쳐 변경이 필요한 컴포넌트를 체크하는 단계.


- Commit 단계 : 렌더 단계의 변경 사항을 실제 DOM에 적용해 사용자에게 보여주는 과정

Commit 단계에서 DOM을 업데이트한 후에는 라이프사이클 메소드와 useEffect가 실행된다. 
![](https://velog.velcdn.com/images/jutrong/post/930c42d8-ae64-45b1-b8e5-8cb68714d34d/image.png)

 

출처 : 

</br>

<a>https://developer.mozilla.org/ko/docs/Web/API
/Document_Object_Model/Introduction</a>
<a>https://calendar.perfplanet.com/2013/diff/</a>