---
 id: "5"
 title: "staleTime & gcTime"
 subTitle: "서버 상태 관리 라이브러리를 사용하는 주된 이유 중 하나는 데이터의 캐싱 처리를 효과적으로 자동화해 주기 때문이다. 그렇다면 TanStack Query를 프로젝트에 단순히 적용만 하면 모든 데이터 캐싱이 자동으로 처리될까?"
 tags: ["Tanstack-query"]
 tabMenu: "개발"
 date: "2024년 09월 08일"
---

> <span style="color: red;">⚠️ 공부한 내용을 멋대로 기록한 것입니다. 작성된 정보는 순 엉터리정보일 수 있으니 참고하실 때 조심하세요.</span>

</br>



이전 포스팅에서 TanStack Query를 사용하는 이유에 대해 자세히 설명했다. 그 포스팅에서는 주로 ‘왜’ TanStack Query를 사용하는지에 초점을 맞추었는데, 이번 포스팅에서는 ‘어떻게’ TanStack Query를 활용하는지에 대해 다루고자 한다.

서버 상태 관리 라이브러리를 사용하는 주된 이유 중 하나는 데이터의 캐싱 처리를 효과적으로 자동화해 주기 때문이다. 그렇다면 TanStack Query를 프로젝트에 단순히 적용만 하면 모든 데이터 캐싱이 자동으로 처리될까?

사실, 설정에 따라 매우 유연하게 데이터 캐싱을 관리할 수 있다. 자동으로 모든 것을 처리해 주는 것처럼 보이지만, 실제로는 개발자가 세밀하게 캐싱의 동작 방식을 제어할 수 있는 옵션이 많다. 그러한 설정 옵션들 중 몇 가지를 살펴보고, 실제 프로젝트에서 어떻게 적용할지 알아보자 .

</br>


## staleTime, gcTime ?

 해당 라이브러리에서 가장 기본적이고 중요한 개념이다.  defaultOption으로 staleTime 그리고 gcTime을 설정할 수 있다. stale은 사전적으로 신선하지 않은이란 의미이다. 처음 들었을 때는 직관적으로 무슨의미인지 전혀 와닿지 않았다. 옵션을 따로 건드리지 않으면 기본적으로 staleTime이 5분으로 설정되어있다. 이는 데이터를 서버로부터 처음 가져온 후 5분동안 ‘신선’한 데이터로 간주되어 추가적인 데이터 패칭을 하지 않는다. 그렇다면 staleTime을 0분 또는 infinite로 설정하면 어떻게 될까?

###  <span style="color: #19194d; font-size: 18px;"> staleTime을 0으로 설정하는 경우</span>


0으로 설정하게 되면, 데이터를 가져온 직후에 바로 ‘stale’상태가 된다. 이는 해당 데이터를 사용할 때마다 새로운 데이터를 서버에서 가져와야 된다는 것을 의미한다.

이 설정은 실시간으로 업데이트되어야 하는 매우 동적인 데이터에 적합하다. 예를 들어, 주식 가격이나 경매 데이터와 같이 변동성이 큰 정보를 처리할 때 유용하다.

당연한 얘기겠지만 이렇게 설정할 경우에는 캐싱된 데이터를 사용할 수 없고, 매번 데이터를 서버로부터 fetching해야한다.

###  <span style="color: #19194d; font-size: 18px;"> staleTime을 무한대로 설정하는 경우</span>

무한대로 설정하면, 데이터는 캐시된 이후에 기본적으로 ‘stale’상태로 전환되지 않는다. 이는 데이터를 한 번 페칭한 후 추가적인 서버 요청 없이 계속해서 캐시된 데이터를 재사용하고 싶을 때 유용하다.

이 설정은 변하지 않는 데이터, 예를 들어 사용자의 설정이나 정적인 정보(문서)에 적합하다. 또한 네트워크 비용을 최소화하고자 할 때나 서버 부하를 줄여야 하는 상황에도 staleTime을 적절하게 설정한다.

무한대로 설정할 경우 기본적으로 서버로부터 데이터 요청없이 계속 신선한 데이터라 인식한다. 그러나 특정 상황에서 새로운 데이터를 명시적으로 불러올 필요가 있다. 그럴 경우에는 어떻게 데이터가 신선하지 않다고 설정하고 새로운 데이터를 불러올까? 

1. <b>Refetch 함수 사용</b>

각 query 인스턴스는 refetch 메소드를 제공한다. 이 메소드를 호출하면, 해당 쿼리는 강제로 새로운 데이터를 서버에서 불러올 수 있다. 예를 들어, 사용자가 새로고침 버튼을 클릭했을 때 데이터를 갱신하려면 다음과 같이 refetch를 사용할 수 있다.

```jsx
const { data, refetch } = useQuery(['someKey'], fetchDataFunction, { staleTime: Infinity });

return (
  <div>
    <button onClick={() => refetch()}>Refresh Data</button>
    <div>{data}</div>
  </div>
);
```

2. <b>Query Invalidation</b>

queryClient 객체를 사용하면, 특정 쿼리의 캐시를 무효화하고 자동으로 데이터를 새로고침할 수 있다. 이 방법은 refetch와 유사하지만, 여러 컴포넌트에 걸쳐 쿼리를 무효화할 때 특히 유용하다.

```jsx
// 매니저 등록이 성공했을 시 쿼리 무효화
// invalidateQuires를 통해 Key값이'manager'인 데이터들이 즉시 '신선'하지 않은 데이터로 간주
export const useManagerDeleteMutation = ({
  storeId,
  managerId,
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => managerApi.deleteManager(storeId, managerId),
    onSuccess: () => {
      toast.success('매니저가 성공적으로 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['manager', storeId],
      });
    },
    onError: () => {
      toast.error('매니저 삭제에 실패했습니다. 잠시후 다시 시도해주세요.');
    },
  });
};
```

3. <b>Window Focus or Network Reconnection</b>

refetchOnWindowFocus or refetchOnReconnect 옵션을 true로 설정하면, 사용자가 브라우저 창으로 다시 돌아오거나 네트워크 연결이 재개될 때 데이터를 자동으로 새로고침할 수 있다.

```jsx
useQuery(['someKey'], fetchDataFunction, {
  staleTime: Infinity,
  refetchOnWindowFocus: true,
  refetchOnReconnect: true
});
```

4. <b>Polling</b>

정기적으로 데이터를 새로고침하려면, refetchInterval옵션을 사용할 수 있다. 이 옵션은 지정된 간격마다 쿼리를 새로고침한다. staleTime이 무한대일지라도, 이 설정을 사용하면 주기적으로 데이터를 업데이트 할 수 있다.

```jsx
useQuery(['someKey'], fetchDataFunction, {
  staleTime: Infinity,
  refetchInterval: 60000 // 1분마다 데이터 새로고침
});
```

이러한 방법들을 통해 staleTime이 끝나기 전, 필요에 따라 데이터를 적절하게 새로고침하고 업데이트 할 수 있다.

### gcTime이란

gcTime은 “Garbage Collection Time”의 약자이다. 이전 버전에서는 cacheTime이었지만 캐싱 데이터를 사용할 수 있는 시간과 혼동되어, gcTime으로 명을 바꾼 것 같다.

gcTime을 설정하는 것은 캐시된 쿼리 데이터가 얼마 동안 메모리에 유지되어야 하는지를 설정하는 것이다. 즉 쿼리 데이터가 “inactive”상태가 된 후 얼마 동안 데이터를 캐시에서 완전히 제거하지 않고 보관할지를 지정한다.

gcTime이 staleTime보다 짧게 설정하는 경우는 일반적으로 권장되지 않는데, 이는 캐시 관리 메커니즘과 데이터 패칭 전략 사이에서 충돌이 발생할 수 있기 때문이다. 이는 해당 설정의 역할을 이해하면 단 번에 이해할 수 있을 것이다.

</br>

<strong>gcTime < staleTime의 문제점</strong>

1. 데이터 유실

staleTime이 아직 만료되지 않았지만 gcTime이 만료되어 데이터가 캐시에서 제거된 경우, 이론적으로 데이터는 여전히 신선하지만 실제로는 캐시에 존재하지 않게 된다. 이 경우, 데이터는 필요할 때 즉시 제공될 수 없고, 다시 서버에서 페칭해야 한다.

2. 성능 저하

캐시에서 데이터가 빠르게 제거되면, 사용자가 자주 접근하는 데이터조차도 반복적으로 서버에서 다시 로드해야 한다.

일반적으로 gcTimedms staleTime보다 길게 설정하는 것이 권장된다.

</br>

## 효율적으로 캐시하는 방법

### <span style="color: #19194d; font-size: 20px;">staleTime이나 cacheTime을 어떤 경우에 조정하면 좋을까?</span>

1. 데이터가 자주 변하는 경우

    a. staleTime을 짧게 설정하여 데이터의 신선도를 유지할 수 있다.

    b. 사용자가 항상 최신 데이터를 볼 필요가 있는 경우

    c. ex) 실시간 피드, 금융 시장 데이터, 사용자 생성 컨텐츠, IoT 디바이스 데이터
2. 데이터가 자주 변경되지 않는 경우

    a. staleTime을 길게 늘려 네트워크 요청을 줄이고 성능을 향상시킬 수 있다. 서버의 부하를 감소시키고 애플리케이션의 반응성을 향상시키는데 도움이 된다.

    b. ex) 정적 콘텐츠, 설정 데이터

변동성이 중간일 경우 실제 데이터가 바뀌는 주기를 지속적으로 모니터링 한 후 최적의 staleTime을 찾는게 중요하다. 
**가장 어려운 말이지만 가장 맞는 말은 ‘적당히’, 즉 ‘적당한 staleTime으로 조정해라’**

### <span style="color: #19194d; font-size: 20px;">캐싱 전략 효율화</span>

1. 적절한 staleTime, cacheTime 설정

    - 바로 전에 설명했던 내용 참고

2. 백그라운드 업데이트 활용

    - 사용자의 인터랙션을 방해하지 않으면서 백그라운드에서 데이터를 업데이트하는 전략. 예를 들어 staleTime이 만료된 후에도 사용자가 데이터에 접근하지 않는다면, 백그라운드에서 조용히 데이터를 갱신할 수 있다.

3. 조건부 패칭

    - 변경 가능성이 낮은 데이터에 대해 조건부 패칭을 구현하여, 실제로 필요할 때만 데이터를 패칭한다. 사용자의 프로필 정보와 같은 정적 데이터는 큰 변동이 없는 한 캐시에서 가져오고, 사용자가 정보를 수정하는 경우에만 서버에 패칭 요청을 보낸다.

4. 캐시 무효화

    - 데이터가 변경되었을 때 적절히 캐시를 클리어하고 새 데이터로 갱신.

</br>

[https://tkdodo.eu/blog/practical-react-query](https://tkdodo.eu/blog/practical-react-query)
