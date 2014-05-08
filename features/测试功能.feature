Feature: 百度搜索功能

  Scenario: 搜索关键字显示相应结果
    When 我浏览网址"http://www.baidu.com"
    And 我在搜索框中输入"Scrum"并按百度一下按钮
    Then 我可以看到百度为我找到相关结果约2,860,000个