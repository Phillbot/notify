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
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from "react-native";

import { ChatMessage, ChatController } from "~core/stores/chat";

@observer
export class Chat extends Component {
  @resolve(ChatController)
  declare private readonly _controller: ChatController;

  private flatListRef = createRef<FlatList<ChatMessage>>();
  private appStateSubscription: NativeEventSubscription | undefined;

  override componentDidMount() {
    this._controller.init();

    // Subscribe to AppState changes
    this.appStateSubscription = AppState.addEventListener(
      "change",
      this._handleAppStateChange
    );
  }

  override componentWillUnmount() {
    this.appStateSubscription?.remove();
  }

  override componentDidUpdate() {
    this.flatListRef.current?.scrollToEnd({ animated: true });
  }

  private _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === "active") {
      console.log("📱 App has come to the foreground! Checking connection...");
      // Re-initialize connection if needed
      // ChatController.init() calls ChatStore.connect(), which has a check for isConnected.
      // However, after backgrounding, the socket might be dead but state not updated yet.
      // Ideally we should force a ping or verify connection.
      // For now, calling init() is safe due to the check.
      this._controller.init();
    }
  };

  renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={styles.messageContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.from.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.messageContent}>
        <Text style={styles.messageFrom}>{item.from}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  renderLogin() {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Welcome to Chat</Text>
        <Text style={styles.loginSubtitle}>Please enter your nickname</Text>
        <TextInput
          style={styles.loginInput}
          value={this._controller.tempNickname}
          onChangeText={(text) => this._controller.setTempNickname(text)}
          placeholder="Nickname"
        />
        <Button
          title="Join Chat"
          onPress={() => this._controller.join()}
          disabled={!this._controller.tempNickname.trim()}
        />
      </View>
    );
  }

  override render() {
    const { message, messages, isConnected, userName } = this._controller;

    if (!isConnected) {
      return (
        <View style={styles.centered}>
          <Text style={styles.connecting}>Connecting to server...</Text>
        </View>
      );
    }

    if (!userName) {
      return this.renderLogin();
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View style={styles.headerBar}>
          <Text style={styles.userInfo}>👤 {userName}</Text>
          <Button title="Exit" onPress={() => this._controller.logout()} color="#ef4444" />
        </View>

        <FlatList
          ref={this.flatListRef}
          data={messages.slice()}
          renderItem={this.renderMessage}
          keyExtractor={(_, index) => index.toString()}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={(text) => this._controller.setMessage(text)}
            placeholder="Type your message"
            onSubmitEditing={() => this._controller.sendMessage()}
            returnKeyType="send"
          />
          <Button
            title="Send"
            onPress={() => this._controller.sendMessage()}
            disabled={!message.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  connecting: {
    fontSize: 16,
    color: "#64748b",
  },
  loginContainer: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 32,
  },
  loginInput: {
    width: "100%",
    height: 56,
    borderWidth: 2,
    borderColor: "#f1f5f9",
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 16,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 20,
    gap: 16,
  },
  messageContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    maxWidth: "85%",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
  },
  messageContent: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  messageFrom: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6366f1",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#1e293b",
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    alignItems: "center",
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  userInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
  },
});
