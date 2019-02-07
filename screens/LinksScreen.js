import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import { LinearGradient } from "expo";
import GestureRecognizer, {
  swipeDirections
} from "react-native-swipe-gestures";
import Draggable from "react-native-draggable";
import CardStack, { Card } from "react-native-card-stack-swiper";

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: "I am ready to swipe",
      gestureName: "none",
      backgroundColor: "#fff",
      countRight: 0,
      countLeft: 0,
      isLoading: true,
      dataLists: [],
      controlledPosition: {
        x: -400,
        y: 200
      },
      deltaPosition: {
        x: 0,
        y: 0
      }
    };
  }

  static navigationOptions = {
    title: "Links"
  };

  componentWillMount() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => this.setState({ dataLists: data }));
  }

  onSwipedLeft() {
    this.setState({ myText: "I like the idea" });

    console.log({ myText: "I like the idea" });
  }

  onSwipedRight() {
    this.setState({ myText: "Dislike the idea" });
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: "red" });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: "green" });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: "blue" });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: "yellow" });
        break;
    }
  }

  getInitialState() {
    return {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  }

  onStart() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop() {
    this.setState({ activeDrags: --this.state.activeDrags });
  }

  adjustXPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  }

  adjustYPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { cotrolledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  }

  onControlledDrag(e, position) {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const {
      deltaPosition,
      controlledPosition,
      countLeft,
      countRight,
      dataLists
    } = this.state;

    return (
      <LinearGradient
        colors={["#99DAFF", "#8C7BC7", "#7D0080"]}
        style={styles.linearGradient}
      >
        

        {/* <Draggable
          renderSize={56}
          renderColor="black"
          offsetX={-100}
          offsetY={-200}
          renderText="option 1"
          pressDrag={() => alert("touched!!")}
        />

        <Draggable
          renderSize={56}
          renderColor="black"
          offsetX={100}
          offsetY={-200}
          renderText="option 2"
          pressDrag={() => alert("touched!!")}
          onSwipe={(direction, state) => this.onSwipe(direction, state)}
          onSwipeUp={state => this.onSwipeUp(state)}
          onSwipeDown={state => this.onSwipeDown(state)}
          onSwipeLeft={state => this.onSwipeLeft(state)}
          onSwipeRight={state => this.onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            renderColor: this.state.backgroundColor
          }}
        />

        <Draggable
          reverse={false}
          renderColor="red"
          renderShape="square"
          offsetX={100}
          offsetY={0}
          renderText="B"
        /> */}

        
        <CardStack
          style={styles.content}
          disableTopSwipe={true}
          disableBottomSwipe={true}
          loop={true}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={() => console.log("onSwiped")}
          onSwipedLeft={state => this.onSwipedLeft(state)}
          onSwipedRight={state => this.onSwipedRight(state)}
        >
          {dataLists.map(idea => (
            <Card style={[styles.card, styles.card1]}>
              <Text style={styles.label}> {idea.title} </Text>
            </Card>
          ))}
        </CardStack>
        <Text>{this.state.myText}</Text>
        {/* <View style={styles.center}>
          <Text style={styles.textCenter} />
        </View> */}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  center: {
    width: 300,
    height: 50,
    position: "absolute",
    alignSelf: "center",
    marginTop: 250,
    backgroundColor: "#fff",
    borderRadius: 5
  },
  textCenter: {
    position: "absolute",
    alignSelf: "center",
    marginTop: 13
  },
  card: {
    width: 220,
    height: 370,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",

    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
    backgroundColor: "#FE474C"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },

  label: {
    lineHeight: 400,
    textAlign: "center",
    fontSize: 10,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },
  content: {
    position: "absolute",
    marginLeft: 80,
    marginTop: 20
  }
});
