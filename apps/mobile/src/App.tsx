import { Component } from "react";
import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { Button, StyleSheet, Text, View, ScrollView } from "react-native";

import { Action, ICounterStore } from "~core/stores/counter";

import { Chat } from "./features/chat";

@observer
export class App extends Component {
  @resolve(ICounterStore.$)
  declare private readonly _counterStore: ICounterStore;

  override state = {
    a: 0,
  };

  override render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.counterSection}>
          <Text style={styles.title}>Counter</Text>
          <Text style={styles.count}>{this._counterStore.count}</Text>
          <Button
            title={`Press me ${this.state.a}`}
            onPress={() => {
              this._counterStore.change(Action.Increment);
              this.setState({ a: this.state.a + 1 });
            }}
          />
        </View>

        <View style={styles.chatSection}>
          <Text style={styles.title}>Chat</Text>
          <Chat />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flexGrow: 1,
  },
  counterSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    alignItems: "center",
  },
  chatSection: {
    flex: 1,
    minHeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  count: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
