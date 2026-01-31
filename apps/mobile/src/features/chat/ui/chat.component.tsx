import { Component, createRef } from "react";
import { resolve } from "inversify-react";
import { observer } from "mobx-react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { IChatStore, ChatMessage } from "~core/stores/chat";
import { getWebSocketUrl } from "~core/config";

interface State {
  message: string;
}

@observer
export class Chat extends Component<unknown, State> {
  @resolve(IChatStore.$)
  declare private readonly _chatStore: IChatStore;

  private flatListRef = createRef<FlatList<ChatMessage>>();

  override state: State = {
    message: "",
  };

  override componentDidMount() {
    // For physical device, pass your local IP:
    // this._chatStore.connect(getWebSocketUrl({ deviceIp: '192.168.0.106' }));
    this._chatStore.connect(getWebSocketUrl());
  }

  override componentWillUnmount() {
    this._chatStore.disconnect();
  }

  override componentDidUpdate(_: unknown, prevState: State) {
    if (prevState.message !== this.state.message) {
      this.flatListRef.current?.scrollToEnd({ animated: true });
    }
  }

  handleSend = () => {
    const { message } = this.state;
    this._chatStore.sendMessage(message);
    this.setState({ message: "" });
  };

  renderMessage = ({ item }: { item: ChatMessage }) => (
    <View
      style={[
        styles.messageContainer,
        item.from === "client" ? styles.clientMessage : styles.serverMessage,
      ]}
    >
      <Text style={styles.messageFrom}>{item.from}:</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  override render() {
    const { message } = this.state;
    const { messages, isConnected } = this._chatStore;

    if (!isConnected) {
      return (
        <View style={styles.container}>
          <Text style={styles.connecting}>Connecting to server...</Text>
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={this.flatListRef}
          data={messages}
          renderItem={this.renderMessage}
          keyExtractor={(_, index) => index.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => this.setState({ message: text })}
            placeholder="Type your message"
            onSubmitEditing={this.handleSend}
            returnKeyType="send"
          />
          <Button title="Send" onPress={this.handleSend} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  connecting: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666666",
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    maxWidth: "80%",
  },
  clientMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  serverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageFrom: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    color: "#666666",
  },
  messageText: {
    fontSize: 16,
    color: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    alignItems: "center",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
});
