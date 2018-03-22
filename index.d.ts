declare namespace Adonis {
    type WorkInProgress = any

    class Config {
        syncWithFileSystem(): void
        get(key: string, defaultValue?: any): any
        merge(key: string, defaultValues: Object, customizer?: Function): Object
        set(key: string, value: any): void
    }

    class Env {
        load(filePath: string, overwrite?: true, encoding?: 'utf-8'): void
        getEnvPath(): string
        get(key: string, defaultValue?: any): any
        set(key: string, value: any): void
    }

    type EventListeners = string | string[] | Function

    class Event {
        getListeners(event: string): Array<string | Function>
        getListenersAny(): Array<string | Function>
        hasListeners(event: string): boolean
        listenersCount(event: string): number
        times(number: number): Event
        on(event: string, listeners: EventListeners): void
        when(event: string, listeners: EventListeners): void
        once(event: string, listeners: EventListeners): void
        any(listeners: EventListeners): void
        onAny(listeners: EventListeners): void
        emit(event: string, ...args: any[]): void
        fire(event: string, ...args: any[]): void
        off(event: string, listeners: EventListeners): void
        offAny(listeners: EventListeners): void
        removeListener(event: string, listeners: EventListeners): void
        removeAllListeners(event: string): void
        setMaxListeners(number: number): void
        fake(): void
        restore(): void
    }

    class Hash {
        make(value: string, rounds: number): Promise<string>
        verify(value: string, hash: string): Promise<boolean>
    }

    namespace Http {
        class Request {
            body: Object
            get(): Object
            post(): Object
            all(): Object
            raw(): Object
            collect(keys: string[]): Object[]
            input(key: string, defaultValue?: any): any
            except(keys: string[]): Object
            only(keys: string[]): Object
            method(): string
            intended(): string
            headers(): Object
            header(key: string, defaultValue?: any): any
            ip(trust?: boolean): string
            ips(trust?: boolean): string[]
            protocol(trust?: boolean): string
            secure(): boolean
            subdomains(trust?: boolean, offset?: number): string[]
            ajax(): boolean
            pjax(): boolean
            hostname(trust?: boolean): string
            url(): string
            originalUrl(): string
            is(types: string[]): string
            accepts(types: string[]): string | string[]
            types(): string[]
            language(acceptedLanguages: string[]): string
            languages(): string[]
            encoding(acceptedEncodings: string[]): string
            encodings(): string[]
            charset(acceptedCharsets: string[]): string
            charsets(): string[]
            hasBody(): boolean
            cookies(): { [key: string]: string }
            plainCookies(): { [key: string]: string }
            cookie(key: string, defaultValue?: any): any
            plainCookie(key: string, defaultValue?: any): any
            match(routes: string[]): boolean
            fresh(): boolean
            stale(): boolean
            format(): string
        }

        class Response {
            finished: boolean
            headersSent: boolean
            isPending: boolean
            status(): number
            header(key: string, value: string): Response
            safeHeader(key: string, value: string): Response
            removeHeader(key: string): Response
            getHeader(key: string): string | void
            download(filePath: string, options?: {}): void
            attachment(filePath: string, name?: string, disposition?: string, options?: {}): void
            location(url: string): Response
            redirect(url: string, sendParams?: false, status?: 302): void
            route(routeNameOrHandler: string, data?: {}, domain?: string, sendParams?: false, status?: 302): void
            vary(field: string): Response
            type(type: string, charset?: string): Response
            send(body: any, generateEtag?: boolean): void
            json(body: Object, generateEtag?: boolean): void
            jsonp(body: Object, callbackFn?: Function, generateEtag?: boolean): void
            end(): void
            cookie(key: string, value: any, options?: {}): void
            plainCookie(key: string, value: any, options?: {}): void
            clearCookie(key: string): void
            abortIf(expression: any, status: number, body: any): void
            abortUnless(expression: any, status: number, body: any): void
        }

        class Context {
            auth: WorkInProgress
            request: Adonis.Http.Request
            response: Adonis.Http.Response
            view: Adonis.View
        }

        type Handler = (ctx: Context) => any
    }

    class Route {
        domain(domain: string): Route
        formats(formats: string[], strict: false): Route
        as(name: string): Route
        middleware(middleware: string | string[]): Route
        middleware(...middleware: Function[]): Route
        prependMiddleware(middleware: string | string[]): Route
        prependMiddleware(...middleware: Function[]): Route
        prefix(prefix: string): Route
        resolve(url: string, verb: 'string', host?: string): { url: string; params: string[]; subdomains: {} } | null
        toJSON(): {
            route: Route
            verbs: string[]
            handler: string | Http.Handler
            middleware: Array<string | Function>
            name: string
            domain?: RegExp
        }
    }

    namespace Route {
        class Brisk {
            setHandler(handler: Function | string, verbs: string[]): Route
            render(template: string, data?: {}): Route
        }

        class Group {
            middleware(middleware: string | string[]): Group
            middleware(...middleware: Function[]): Group
            formats(formats: string[], strict: false): Group
            prefix(prefix: string): Group
            domain(domain: string): Group
        }

        class Resource {
            only(names: string[]): Resource
            except(names: string[]): Resource
            apiOnly(): Resource
            middleware(middleware: string | string[]): Resource
            middleware(middleware: Map<string[], string>): Resource
            formats(formats: string[], strict: false): Resource
        }

        class Manager {
            route(route: string, handler: string | Http.Handler, verbs: string[]): Route
            get(route: string, handler: string | Http.Handler): Route
            post(route: string, handler: string | Http.Handler): Route
            put(route: string, handler: string | Http.Handler): Route
            patch(route: string, handler: string | Http.Handler): Route
            delete(route: string, handler: string | Http.Handler): Route
            any(route: string, handler: string | Http.Handler): Route
            on(route: string): Brisk
            match(url: string, verb: string, host?: string): Object | null
            group(callback: Function): Group
            group(name: string, callback: Function): Group
            resource(resouce: string, controller: string): Resource
            list(): Route[]
            url(routeNameOrHandler: string, data?: {}, options?: string): string | null
        }
    }

    class View {
        engine: View.Engine
        global(name: string, value: any): void
        share(locals: Object): View.Engine
        render(view: string, data?: {}): string
        renderString(statement: string, data?: {}): string
        presenter(presenter: string): View.Engine
        tag(tag: View.Tag): void
    }

    namespace View {
        class Engine {
            new(): Template
            tag(tag: Tag): void
            configure(options: Object): void
            global(name: string, value: any): void
            registerViews(location: string): void
            registerPresenters(location: string): void
            renderString(statement: string, data?: {}): string
            compileString(statement: string, asFunction?: true): string
            render(view: string, data?: {}): string
            compile(view: string, asFunction?: true): string
            presenter(presenter: string): Engine
            share(locals: Object): Engine
        }

        class Template {
            // TODO
        }

        interface Tag {
            tagName: string
            compile(
                compiler: Object,
                lexer: Object,
                buffer: Object,
                options: {
                    body: string
                    childs: any[]
                    lineno: number
                }
            ): void
            run(): void
        }
    }
    
    class Database {
        beginTransaction(): Database
        commit(): void
        rollback(): void
        transaction(callback: (ctx: Database) => void): void

        table(table: string): Database.Query
        from(table: string): Database.Query
        into(table: string): Database.Query

        close(): void
        close(connections: string[]): void
    }

    namespace Database {
        type SimpleAny = number | string | Date 
        type Direction = 'asc' | 'desc'
        type AggragationResult = Promise<Object[][]>
        type NumberResult = Promise<number>
        type NumberResults = Promise<number[]>

        interface PaginationPages {
            total: number
            currentPage: number
            perPage: number
            lastPage: number
        }

        class PaginationResult<T> {
            pages: PaginationPages
            row: T[]
        }

        type QueryOrResult<T> = Database.Query | Promise<T[]>

        class Query {
            select<T>(column: string): QueryOrResult<T>
            select<T>(...columns: string[]): QueryOrResult<T>

            where(column: string, value: any): Database.Query | Promise<Object[]>
            where(column: string, operator: string, value: any): Database.Query
            where(condition: Object): Database.Query
            where(callback: Function): Database.Query
            where(subquery: Database.Query): Database.Query
            whereNot(column: string, value: any): Database.Query
            whereNot(column: string, operator: string, value: any): Database.Query
            whereNot(condition: Object): Database.Query
            whereNot(subquery: Database.Query): Database.Query
            whereIn(column: string, params: any[]): Database.Query
            whereIn(column: string, subquery: Database.Query): Database.Query
            whereNotIn(column: string, params: any[]): Database.Query
            whereNotIn(column: string, subquery: Database.Query): Database.Query
            whereNull(column: string): Database.Query
            whereNotNull(column: string): Database.Query
            whereExists(callback: Function): Database.Query
            whereNotExists(callback: Function): Database.Query
            whereBetween(column: string, params: number[]): Database.Query
            whereNotBetween(column: string, params: number[]): Database.Query
            whereRaw(exp: string, params: Database.SimpleAny[]): Database.Query

            innerJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            innerJoin(table: string, callback: Function): Database.Query
            leftJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            leftOuterJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            rightJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            rightOuterJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            outerJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            fullOuterJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            crossJoin(table: string, leftSideCondition: string, rightSideCondition: string): Database.Query
            joinRaw(condition: string): Database.Query

            distinct(column: string): Database.Query
            groupBy(column: string): Database.Query
            groupByRaw(exp: string): Database.Query
            
            orderBy(column: string, direction?: Database.Direction): Database.Query
            orderByRaw(exp: string): Database.Query

            having(column: string, operator: string, value: any): Database.Query
            havingIn(column: string, params: any[]): Database.Query
            havingNotIn(column: string, params: any[]): Database.Query
            havingNull(column: string): Database.Query
            havingNotNull(column: string): Database.Query
            havingExists(subquery:Database.Query): Database.Query
            havingExists(callback: Function): Database.Query
            havingNotExists(subquery:Database.Query): Database.Query
            havingNotExists(callback: Function): Database.Query
            havingRaw(column: string, operator: string, value: Database.SimpleAny[]): Database.Query

            offset(offset: number): Database.Query
            limit(limit: number): Database.Query

            insert(row: Object): NumberResults
            insert(rows: Object[]): NumberResults
            returning(column: string): NumberResult

            update(column: string, value: Database.SimpleAny): NumberResult
            update(row: Object): NumberResult

            increment(column: string, value?: number): Promise<void>
            decrement(column: string, value?: number): Promise<void>

            delete(): NumberResult
            truncate(table: string): NumberResult

            forPage(page: number, limit?: number): Promise<Object[]>
            forPage<T>(page: number, limit?: number): Promise<T[]>
            paginate(page: number, limit?: number): Promise<Database.PaginationResult<Object>>
            paginate<T>(page: number, limit?: number): Promise<Database.PaginationResult<T>>

            count(): Database.AggragationResult
            count(column: string): Database.AggragationResult
            countDistinct(): Database.AggragationResult
            min(column: string): Database.AggragationResult
            max(column: string): Database.AggragationResult
            sum(column: string): Database.AggragationResult
            sumDistinct(column: string): Database.AggragationResult
            avg(column: string): Database.AggragationResult
            avgDistinct(column: string): Database.AggragationResult

            // helpers
            getCount(column?: string): NumberResult
            getCountDistinct(column?: string): NumberResult
            getMin(column: string): NumberResult
            getMax(colum: string): NumberResult
            getSum(column: string): NumberResult
            getSumDistinct(column: string): NumberResult
            getAvg(column: string): NumberResult
            getAvgDistinct(column: string): NumberResult

            pluck<T>(colum: string): Promise<T[]>
            first<T>(): Promise<T>
            map<T, R>(callback: (row: T | Object) => R): Promise<R[]> 
            reduce<T, S>(reducer: (acc: S, row: T) => S, initValue: S): Promise<S>

            clone(): Database
            columnInfo(): Promise<Object>

            raw<T>(expression: string, params?: Database.SimpleAny[]): Promise<T[]>

            asCallback<T>(callback: (err: Object, rows: T[]) => void): void
            stream(callback: any): Object
            on(event: string, callback: Function): Database.Query
            toSQL(): ToSQLResult

            then(callback: (response: any) => void): Database.Query
            catch(callback: (error: any) => void): Database.Query
        }

        interface ToSQLResult {
            bindings: any[]
            method: string
            sql: string
            toNative(): Object
        }
    }
    
    class Validator {
        validate: Validator.ValidateFun
        validateAll: Validator.ValidateFun
        sanitize: Object    // TODO
        sanitizor: Object   // TODO
        formatters: Object  // TODO
    }

    namespace Validator {
        type ValidateFun = (data: Object, rules: Object, messages?: Object, formatter?: Object) => Validator.ValidationResult

        interface ErrorMessage {
            message: string
            field: string
            validation: string
        }

        class ValidationResult {
            fails(): boolean
            messages(): ErrorMessage[]
        }
    }
}

declare namespace AdonisNamespaces {
    type Command = 'Command' | 'Adonis/Src/Command'
    type Config = 'Config' | 'Adonis/Src/Config'
    type Database = 'Database' | 'Adonis/Src/Database'
    type Env = 'Env' | 'Adonis/Src/Env'
    type Event = 'Event' | 'Adonis/Src/Event'
    type Factory = 'Factory' | 'Adonis/Src/Factory'
    type Hash = 'Hash' | 'Adonis/Src/Hash'
    type Helpers = 'Helpers' | 'Adonis/Src/Helpers'
    type Lucid = 'Lucid' | 'Adonis/Src/Lucid'
    type Middleware = 'Middleware' | 'Adonis/Src/Middleware'
    type Route = 'Route' | 'Adonis/Src/Route'
    type Schema = 'Schema' | 'Adonis/Src/Schema'
    type View = 'View' | 'Adonis/Src/View'
    type Ws = 'Ws' | 'Adonis/Addons/Ws'
    type Validator = 'Validator'
}

declare function use(namespace: AdonisNamespaces.Command): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.Config): Adonis.Config
declare function use(namespace: AdonisNamespaces.Database): Adonis.Database
declare function use(namespace: AdonisNamespaces.Env): Adonis.Env
declare function use(namespace: AdonisNamespaces.Event): Adonis.Event
declare function use(namespace: AdonisNamespaces.Factory): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.Hash): Adonis.Hash
declare function use(namespace: AdonisNamespaces.Helpers): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.Lucid): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.Middleware): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.Route): Adonis.Route.Manager
declare function use(namespace: AdonisNamespaces.Schema): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.View): Adonis.View
declare function use(namespace: AdonisNamespaces.Ws): Adonis.WorkInProgress
declare function use(namespace: AdonisNamespaces.Validator): Adonis.Validator
