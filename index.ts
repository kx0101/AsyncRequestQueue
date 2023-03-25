type RequestCallBack = () => Promise<void>;

class RequestQueue {
    private queue: RequestCallBack[] = [];
    private isProcessing = false;

    public addRequest(request: RequestCallBack): void {
        this.queue.push(request);

        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    private async processQueue(): Promise<void> {
        this.isProcessing = true;
        while (this.queue.length) {
            try {
                const request = this.queue.shift();

                if (request) {
                    await request();
                }
            } catch (error) {
                console.log(error);
            }
        }

        this.isProcessing = false;
    }
}

const requestQueue = new RequestQueue();

requestQueue.addRequest(async () => {
    console.log("Request 1 started");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Request 1 completed");
});

requestQueue.addRequest(async () => {
    console.log("Request 2 started");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Request 2 completed");
});

console.log("Added requests to queue");
console.log("Main thread is not blocked!");

setTimeout(() => {
    console.log("so useful!");
}, 1000)
