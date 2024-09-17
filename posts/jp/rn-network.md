---
 id: "8"
 title: "React Native Network State"
 subTitle: "라이브러리를 사용하면 인터넷 연결 여부, 네트워크 유형(예: WiFi, 셀룰러, 유선, 없음 등), 추가적인 연결 세부 정보(예: 속도나 IP 주소)를 알 수 있어 앱의 네트워크 기반 기능을 효율적으로 관리할 수 있다."
 tags: ["React Native"]
 tabMenu: "개발"
 date: "2024년 09월 17일"
---

> <span style="color: red;">⚠️ 공부한 내용을 멋대로 기록한 것입니다. 작성된 정보는 순 엉터리정보일 수 있으니 참고하실 때 조심하세요.</span>

</br>

# RN - Network 상태 확인

현재 서비스중인 앱에서 네트워크 상태를 확인하여 처리를 하는 요구사항이 들어왔다. 

요구사항은 다음과 같다. 

</br>

## 요구사항 : 네트워크가 끊겼을 경우

1. 네트워크 연결이 불안정할 경우 유저에게 인지
2. NFC, QR 시작 버튼 클릭 시 모달 또는 Alert
3. 페이지 이동하였을 경우 재시도 모달 (store 페이지는 기본 Modal, 유저 설정 페이지에서는 full Modal )
4. 네트워크가 다시 연결되었을 경우 데이터 refetch

### React-native-netinfo

<a style="color: blue;" href="https://www.npmjs.com/package/@react-native-community/netinfo/v/6.0.6">https://www.npmjs.com/package/@react-native-community/netinfo/v/6.0.6</a>

</br>

네트워크 상태를 감지하기 위해 해당 라이브러리를 사용하였다. 이 라이브러리를 사용하면 인터넷 연결 여부, 네트워크 유형(예: WiFi, 셀룰러, 유선, 없음 등), 추가적인 연결 세부 정보(예: 속도나 IP 주소)를 알 수 있어 앱의 네트워크 기반 기능을 효율적으로 관리할 수 있다.

사용방법은 간단하다. 

React hook과 같이 사용할 수 있다.

```jsx
import NetInfo from "@react-native-community/netinfo";

const TextComponent = () => {
  const netInfo = useNetInfo();
  
  return (
    <View>
      <Text>Type: {netInfo.type}</Text>
      <Text>Is Connected? {netInfo.isConnected?.toString()}</Text>
    </View>
  );
}
// console.log로 출력한 결과는 다음과 같다.
# iOS
{
   "details":{
      "ipAddress":"00.00.00.00",
      "isConnectionExpensive":false,
      "subnet":"000.000.000.0"
   },
   "isConnected":true,
   "isInternetReachable":true,
   "type":"wifi"
}

# Android
{
   "details":{
      "bssid":"00:00:00:00:00:00",
      "frequency":2447,
      "ipAddress":"00.0.0.00",
      "isConnectionExpensive":false,
      "linkSpeed":1,
      "rxLinkSpeed":2,
      "strength":99,
      "subnet":"000.000.000.0",
      "txLinkSpeed":1
   },
   "isConnected":true,
   "isInternetReachable":true,
   "isWifiEnabled":true,
   "type":"wifi"
}
```

### 네트워크 연결이 불안정할 경우 유저에게 인지

가장 최상단에 위치한 App.tsx에 네트워크 상태 변화를 감지하여 toast알림을 주는 방식을 선택하였다.

초기 네트워크 상태를 설정하고 네트워크 상태 변화를 state로 관리하는 custom hook을 생성하였다.

react-native-netinfo를 사용하는 가장 기본적인 훅 사용 방법이다.

```jsx
const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const networkAlert = () => {
    if (isConnected === false) {
      Alert.alert('네트워크 오류', '네트워크 연결을 확인해주세요.');
      throw new Error('네트워크 연결 에러');
    }
    return;
  };

  useEffect(() => {
    const updateNetworkStatus = (state: NetInfoState) => {
      console.log('Network status changed:', state.isConnected);
      setIsConnected(state.isConnected);
    };

    // 초기 네트워크 상태 설정
    NetInfo.fetch().then(updateNetworkStatus);

    const unsubscribe = NetInfo.addEventListener(updateNetworkStatus);

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      unsubscribe();
    };
  }, []);

  return { isConnected, setIsConnected, networkAlert };
};

export default useNetworkStatus;

```

### NFC, QR 시작 버튼 클릭 시 모달 또는 Alert

해당 요구사항도 간단하다. 위의 커스텀훅을 활용하여 이벤트가 일어나는 함수에서 isConnected가 false일 경우 Alert를 띄우도록 구현하였다.

### 페이지 이동하였을 경우 재시도 모달 (store 페이지는 기본 Modal, 유저 설정 페이지에서는 full Modal )

해당 요구사항을 구현을 하기 위해서는 store page network modal, user page network modal 등 다양한 곳에 사용할 것을 확인하여 모듈화를 진행하였다.

모달내에는 네트워크 연결이 끊겼을 시 재시도 버튼이 있어야하고, 재시도 버튼을 눌렀을 때는 해당 페이지의 데이터를 refetch 시켜야 한다. 재사용 가능한 컴포넌트를 만들고 props로 refetch action을 받기로 했다.

```jsx
interface IUseNetworkRetryProps {
  onRetryAction: () => void;
  isFullContainer?: boolean;
}

const useNetworkRetry = ({
  onRetryAction,
  isFullContainer,
}: IUseNetworkRetryProps) => {
  const netInfo = useNetInfo();
  const modalAction = useModalAction();

  const onRetryConnect = () => {
    onRetryAction();
  };

  useFocusEffect(
    React.useCallback(() => {
      if (netInfo.isConnected === false) {
        modalAction.showModal(
          <RetryModal
            onRetry={onRetryConnect}
            isFullContainer={isFullContainer}
          />,
        );

        Toast.show('네트워크 연결을 확인해주세요.', Toast.SHORT);
        return;
      }
      return () => console.log('unmount');
    }, [netInfo.isConnected]),
  );
};

export default useNetworkRetry;
```

### 네트워크가 다시 연결되었을 경우 데이터 refetch

네트워크가 연결이 되었을 경우 해당 훅을 통해 감지를 하고, retry 버튼을 눌렀을 때 기존의 캐싱된 데이터를 remove 시키고 refetch 받도록 하였다. 

캐싱된 데이터를 삭제시켜준 이유는 이전의 캐싱된 데이터가 있다면 캐싱된 데이터를 보여주게 되는데 네트워크가 불안정할 경우 기존의 데이터를 최신 데이터로 느낄 수 있기 때문에 캐싱 데이터를 remove 시켜주었다.

그리고 네트워크 연결이 끊겼을 경우 재시도 버튼을 누르면 modal이 꺼지지 않게 처리하고 toast 메시지를 통해 네트워크 연결 상태를 유저에게 인지시키는 방식을 사용하였다.

만약 refetch가 성공할 경우 modal을 하이드 시켜주었다. 

```jsx
// store query
export const useStoreViewModel = () => {
  const queryClient = useQueryClient();
  const storeId = useStoreIdx();

  const {
    data: store,
    isLoading,
    refetch: storeRefetch,
  } = useFetchStoreQuery(storeId, {
    enabled: true,
  });

  const removeStoreQuery = () => {
    queryClient.removeQueries({ queryKey: ['store', storeId] });
  };

  return {
    store,
    isLoading,
    storeRefetch,
    removeStoreQuery,
  };
};

// component use

  useNetworkRetry({
    onRetryAction: async () => {
      try {
        await removeStoreQuery();

        const result = await storeRefetch();

        if (result.isSuccess && result.data) {
          modalAction.hideModal();
        } else {
          Toast.show('네트워크 연결을 확인해주세요.', Toast.SHORT);
        }
      } catch (error) {
        console.log(error);
        Toast.show('네트워크 연결을 확인해주세요.', Toast.SHORT);
      }
    },
  });
  

```

### Troble shooting : 네트워크가 끊겼을 경우 User Page에서 fullpage modal이 떠야하도록 예상을 했지만 User Page 들어가기 전 Home Page에서 fullpage modal이 나타났다.

home → user → home으로 이동하여 네트워크를 끊어보니 home page에서 모달이 띄워지는 문제를 겪었다.

useEffect를 통해 isConnected일 경우 modal을 띄워주는 형식으로 구현을 하였는데, 웹 개발을 하면서 useEffect hook에 대한 이해도가 쌓이다 보니 해당 문제를 겪은 것이다.

react-native의 navigator스택 또는 탭 내의 컴포넌트는 사용자가 네비게이션을 통해 이동할 때마다 마운트 및 언마운트되지 않고, 대신 포커스 상태가 변경된다. useEffect는 컴포넌트의 마운트와 언마운트에 반응하기 때문에, 화면이 포커스를 받거나 잃을 때 반응하지 않는다.

<img width="663" alt="%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-18_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_1 09 10" src="https://github.com/user-attachments/assets/c33c8f77-aa3c-48ea-86de-c2d31d94d602">

stack에 user 화면이 쌓여 useEffect가 감지되어 modal이 출력되는 것이였다. 해당 페이지가 Focus되었을 때 사이드 이펙트를 처리하기 위해서는 useEffect 대신 react-native hook인 useFocusEffect를 사용해야 했다. 

react와 react-native 비슷하면서 다르다. 사이드 이펙트에 대한 무지가 앱 전체에 영향을 많이 주는거 같아 항상 조심스럽다.

https://reactnavigation.org/docs/use-focus-effect/
