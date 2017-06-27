namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html


[<JavaScript>]
type Dialog =
    {
        Title:Var<string>
        Content:Var<Elt>
        Visibility:Var<bool>
        IsOK:Var<bool>
    }
    static member Create=
        {
            Title = Var.Create ""
            Content = Var.Create (div[])
            Visibility = Var.Create false
            IsOK = Var.Create false
        }
    member x.ShowDialog title content = 
                                  x.Title.Value <- title
                                  x.Content.Value <- content
                                  x.Visibility.Value <- true
    member x.Render =
        let Alert el ev =
            JS.Alert "Clicked!"
        divAttr[Attr.Style "position" "absolute"
                Attr.Style "left" "50%"
                Attr.Style "top" "50%"
                Attr.Style "z-index" "1"
                Attr.Style "background-color" "white";
                Attr.Style "min-height" "100px";
                Attr.Style "min-width" "200px";
                Attr.DynamicStyle "display" (View.Map (fun (isVis) -> if isVis then "block" else "none")  x.Visibility.View )][
                table
                    [   
                        tr[td[textView x.Title.View]]
                        tr[td[x.Content.View |> Doc.BindView (fun content->content)]]
                        tr[
                            td[
                                buttonAttr [on.click (fun _ _ ->x.IsOK.Value <- false
                                                                x.Visibility.Value <-false)] [text "OK"]
                              ]
                            td[
                                buttonAttr [on.click (fun _ _ ->x.IsOK.Value <- false 
                                                                x.Visibility.Value<-false)] [text "Cancel"]
                              ]
                        ]
                    ]
            ]
