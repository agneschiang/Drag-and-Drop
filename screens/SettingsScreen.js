import React, { Component } from "react";
import { ExpoConfigView } from "@expo/samples";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated
} from "react-native";
import MovingBall from "../components/MovingBall";
import Layout from "../constants/Layout";

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropZoneValues: null,
      pan: new Animated.ValueXY()
    };
  }

  setDropZoneValues(event) {
    this.setState({
      x: event.nativeEvent.layout.x,
      y: event.nativeEvent.layout.y
    });
  }

  render() {
    return (
      <LinearGradient
        colors={["#99DAFF", "#8C7BC7", "#7D0080"]}
        style={styles.linearGradient}
      >
        <View style={styles.mainContainer}>
          <View
            style={styles.dropZone}
            //onLayout={this.setDropZoneValues.bind(this)}
          >
            <Text style={styles.text}> How can we sell more cookies </Text>
          </View>

          {this.renderDraggable()}
        </View>
      </LinearGradient>
    );
  }

  renderDraggable() {
    if (this.state.showDraggable) {
      return (
        <LinearGradient
          colors={["#99DAFF", "#8C7BC7", "#7D0080"]}
          style={styles.linearGradient}
        >
          <View style={styles.draggableContainer1}>
            <MovingBall />
          </View>

          <View style={styles.draggableContainer2}>
            <MovingBall />
          </View>

          <View style={styles.submissionBox}>
            <Text style={styles.text}> Submit your answer here!! </Text>
          </View>
        </LinearGradient>
      );
    }
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get("window");
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  dropZone: {
    height: 80,
    marginTop: 10,
    backgroundColor: "#2c3e50",
    borderRadius: 10
  },
  container1: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff"
  },
  circle: {
    backgroundColor: "white",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  },
  circle1: {
    backgroundColor: "white",
    left: 100
  },
  circle: {
    left: -100
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  submissionBox: {
    backgroundColor: "#2c3e50",
    height: 100,
    width: Window.width - 30,
    position: "absolute",
    top: 350,
    left: 0
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height / 5 - CIRCLE_RADIUS,
    left: Window.width / 2 - 30
  },
  draggableContainer1: {
    position: "relative",
    top: Window.height / 10 - CIRCLE_RADIUS,
    left: -150
  },
  draggableContainer2: {
    position: "relative",
    top: -130,
    left: Window.width / 2 - 250
  }
});
