import { Component } from 'react';
import { observer } from 'mobx-react';
import { resolve } from "inversify-react";
import { Button, StyleSheet, Text, View } from 'react-native';

import { Action, ICounterStore } from '~core/stores/counter/types';

@observer
export class App extends Component {
  @resolve(ICounterStore.$)
  private readonly _counterStore!: ICounterStore;
  override render() {
    return (
      <View style={styles.container}>
        <Text>{this._counterStore.count}</Text>
        <Button title="Press me" onPress={() => this._counterStore.change(Action.Increment)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
