namespace MessagingAppFullStack.Exceptions;

public class EntityNotFoundException<T> : Exception
{
    public EntityNotFoundException(object entityIdentifier): base($"'{typeof(T).Name}' entity with identifier '{entityIdentifier}' does not exist.")
    {}
}