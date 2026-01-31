import { Component } from "react";
import { observer } from "mobx-react";
import { resolve } from "inversify-react";
import { Button, StyleSheet, Text, View } from "react-native";

import { Action, ICounterStore } from "~core/stores/counter";

@observer
export class App extends Component {
  @resolve(ICounterStore.$)
  declare private readonly _counterStore: ICounterStore;

  override state = {
    a: 0,
  };

  override render() {
    return (
      <View style={styles.container}>
        <Text>{this._counterStore.count}</Text>
        <Button
          title={`Press me ${this.state.a}`}
          onPress={() => {
            this._counterStore.change(Action.Increment);
            this.setState({ a: this.state.a + 1 });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
