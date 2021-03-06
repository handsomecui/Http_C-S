#ifndef __COMMON_H__
#define __COMMON_H__

#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <stdlib.h>
#include <errno.h>
#include <unistd.h>
#include <sys/epoll.h>
#include <pthread.h>
#include <malloc.h>
#include <stdbool.h>
#include <iostream>
#include <algorithm>
#include <map>
#include <time.h>
using namespace std;

#define MAX_SOCKET_NUMBERS 1024
enum {
	DO_SUM = 0,
	HEARTBEAT = 1,
	RET_SUM = 2, // for client to recv
	UNKNOWN = 3, // packet is incomplete 
	OVERFLOW = 4 // sum is overflow
};

 #pragma pack(1)
typedef struct PD{
	short data_type;
	char name[16];
	int num1, num2;
}DATA_PACK;
 #pragma pack()
 
void show_err(int err, const char *str);
int setnonblocking(int fd);
#endif
