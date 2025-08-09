import React, { useEffect } from 'react';
import { Chat, ConversationList, useClient, rootStore } from 'shengwang-chat-uikit';

const ChatApp = () => {
    const client = useClient();

    useEffect(() => {
        if (client) {
            client
                .open({
                    user: 'test01',
                    accessToken: '007eJxTYHjeM01hrlVtauCT1O0rZDfEnWg0uGD3or788I6Uol6jr9IKDGlGFiZJpmYmiUZGiSZpFmlJSUZJlklpaammKcnGpmmGyt8upzcEMjJkBD5kYGRgBWImBhCfgQEA/8Yf6A==',
                })
                .then((res) => {
                    console.log('get token success', res);
                    // 创建会话
                    rootStore.conversationStore.addConversation({
                        chatType: 'singleChat', // 'singleChat' || 'groupChat'
                        conversationId: 'test02', // 目标用户 ID 或群组 ID
                        // name: '用户1', // 目标用户昵称或群组名称
                    });
                });
        }
    }, [client]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '350px' }}>
                <ConversationList />
            </div>
            <div style={{ flex: '1' }}>
                <Chat />
            </div>
        </div>
    );
};

export default ChatApp;