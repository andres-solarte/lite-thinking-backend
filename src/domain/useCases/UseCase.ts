export default interface UseCase<I, O> {
    execute(inputArgs: I): Promise<O>
}
