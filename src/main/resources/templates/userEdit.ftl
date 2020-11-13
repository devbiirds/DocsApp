<#import "parts/common.ftl" as c>

<@c.page>
    User editor

    <form action="/user" method="post">
        <input class="form-control" id="exampleFormControlInput1" type="text" name="username" value="${user.username}">
        <#list roles as role>
            <div style="display: flex">
                <label >${role}</label>
                    <input class="form-check-input" type="checkbox" name="${role}" ${user.roles?seq_contains(role)?string("checked", "")}>

            </div>
        </#list>
        <input type="hidden" value="${user.id}" name="userId">
        <input type="hidden" value="${_csrf.token}" name="_csrf">
        <button class="btn btn-success" type="submit">Save</button>
    </form>
</@c.page>