export default interface MesaggingPort {
    send(message: string): Promise<void>
}
