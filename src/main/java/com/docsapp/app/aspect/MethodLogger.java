package com.docsapp.app.aspect;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Slf4j
public class MethodLogger {
    @Pointcut("@annotation(Loggable)")
    public void webServiceMethod() { }
    private static final Logger logger = LoggerFactory.getLogger(MethodLogger.class);

    @Around("webServiceMethod()")
    public Object logWebServiceCall(ProceedingJoinPoint thisJoinPoint) throws Throwable {
        String methodName = thisJoinPoint.getSignature().getName();
        Object[] methodArgs = thisJoinPoint.getArgs();

        logger.debug("Call method " + methodName + " with args " + methodArgs);

        Object result = thisJoinPoint.proceed();

        logger.debug("Method " + methodName + " returns " + result);

        return result;
    }
}