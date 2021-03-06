/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.7330d5f4-0e17-4dbf-8204-9db8dc0af4e4"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var TRUMP_QUOTES = [
    "Last quarter, it was just announced, our gross domestic product - a sign of strength, right? But not for us.", "It was below zero. Who ever heard of this? It's never below zero.", "Our labor participation rate was the worst since 1978.", "But think of it, GDP below zero, horrible labor participation rate, and our real unemployment is anywhere from 18 to 20%. Don't believe the 5.6. Don't believe it.", "That's right - a lot of people up there can't get jobs. They can't get jobs because there are no jobs because China has our jobs and Mexico has our jobs. They all have our jobs. But the real number, the real number, is anywhere from 18 to 19 and maybe even 21% and nobody talks about it because it's a statistic that's full of nonsense.", "Our enemies are getting stronger and stronger by the day and we as a country are getting weaker. Even our nuclear arsenal doesn't work.", "It came out recently. They have equipment that's 30 years old and they don't even know if it works. And I thought it was horrible when it was broadcast on television because boy does that send signals to Putin and all of the other people that look at us and they say 'OK, that is a group of people and that is a nation that truly has no clue. They don't know what they're doing. They don't know what they're doing.'", "We have a disaster called the big lie - Obamacare, Obamacare.", "Yesterday it came out that costs are going, for people, up 39, 39, 49 and even 55%. And deductibles are through the roof. You have to get hit by a tractor, literally a tractor, to use it because the deductibles are so high it's virtually useless. It's a disaster.N", "And remember the $5 billion website, 5 billion we spent on a website, and to this day it doesn't work. A $5 billion dollar website.", "I have so many websites. I have them all over the place. I hire people, they do a website. It costs me $3.", "$5 billion dollar website.", "Well you need somebody because politicians are all talk, no action. Nothing's going to get done. They will not bring us, believe me, to the promised land. They will not.", "As an example, I've been on the circuit making speeches and I hear my fellow Republicans and they're wonderful people. I like them. They all want me to support them.", "They don't know how to bring it about, they come up to my office. I'm meeting with three of them in the next week and they don't know: Are you running, are you not running, could we have your support, what do we do, how do we do it?", "And I like them. I hear their speeches. And they don't talk jobs. They don't talk China. When was the last time you heard 'China's killing us?' They're devaluing their currency to a level that you wouldn't believe it makes it impossible for our companies to compete. Impossible.", "They're killing us, but you don't hear that from anyone else. You don't hear that from anybody else.", "And I watch the speeches. I watch the speeches and they say 'the sun will rise. The moon will set. All sorts of wonderful things will happen.'", "And the people are saying 'What's going on? I just want a job. I don't need the rhetoric, I just want a job.'", "And it's going to get worse because remember, Obamacare really kicks in in 2016, 2016.", "Obama is going to be out playing golf. He might even be on one of my courses - I would invite him. I have the best courses in the world. So I say, you know what, if he wants to - I have one right next to the White House. Right on the Potomac. If he wants to, if he'd like to play, that's fine. In fact I'd love him to leave early and play. That would be a very good thing.", "But Obamacare kicks in in 2016, really bigly. It is going to be amazingly destructive.", "Doctors are quitting.", "I have a friend who's a doctor and he said to me the other day: 'Donald, I never saw anything like it. I have more accountants than I have nurses. It's a disaster. My patients are besides themselves. They had a plan that was good. They had a plan. They have no plan now.'", "We have to repeal Obamacare and it can be replaced with something much better for everybody. Let it be for everybody, but much better and much less expensive for people and for the government. And we can do it.", "So I've watched the politicians. I've dealt with them all my life. If you can't make a good deal with a politician, then there's something wrong with you. There's something certainly not very good and that's what we have representing us.", "They will never make America great again. They don't even have a chance. They are controlled fully, they are controlled fully by the lobbyists, by the donors and by the special interests. Fully. They control them.", "Hey, I have lobbyists. I have to tell you, I have lobbyists that can produce anything for me. They're great. But you know what? It won't happen. It won't happen because we have to stop doing things for some people, but for our country it's destroying this country.", "We have to stop and it has to stop now.", "Our country needs, our country needs a truly great leader and we need a truly great leader now.", "We need a leader that wrote the Art of the Deal. We need a leader that can bring back our jobs, can bring back our manufacturing, can bring back our military, can take care of our vets - our vets have been abandoned. And we also need a cheerleader.", "You know, when President Obama was elected I said 'Well, the one thing I think he'll do well - I think he'll be a great cheerleader for the country. I think he'd be a great spirit. He was vibrant. He was young. I really thought he would be a great cheerleader.", "He's not a leader, that's true. You're right about that. But he wasn't a cheerleader. He's actually a negative force. He's been a negative force. He wasn't a cheerleader, he was the opposite.", "We need somebody that can take the brand of the United States and make it great again. It's not great.", "We need, we need, we need somebody that literally will take this country and make it great again. We can do that.", "And, I will tell you, I love my life. I have a wonderful family. They're saying, 'Dad, you're going to do something that's so tough.'", "You know, all of my life I've heard that a truly successful person, a really, really successful person - and even modestly successful - cannot run for public office. Just can't happen.", "And yet, that's the kind of mindset that you need to make this country great again.", "So, ladies and gentlemen, I am officially running for President of the United States and we are going to make our country great again.", "It can happen. Our country has tremendous potential. We have tremendous potential.", "We have people that aren't working. We have people that have no incentive to work. But they're going to have incentive to work. Because the greatest social program is a job. And they'll be proud, and they'll love it, and they'll make much more money than they would have ever made. And they'll be doing so well, and we're going to be thriving as a country. Thriving. It can happen.", "I will be the greatest jobs president that god ever created, I tell you that.", "I'll bring back our jobs from China, from Mexico, from Japan, from so many places. I'll bring back our jobs, and I'll bring back our money.", "Right now, think of this - we owe China $1.3 trillion. We owe Japan more than that. So they come in, they take our jobs, they take our money and then they loan us back the money and we pay them in interest. And then the dollar goes up, so their deal's even better.", "How stupid are our leaders? How stupid are these politicians to allow this to happen? How stupid are they?", "Business mogul Donald Trump announces his candidacy for the U.S. presidency at Trump Tower on Tuesday in New York. Trump is the 12th Republican who has announced running for the White House. Christopher Gregory/Getty Images", "Business mogul Donald Trump announces his candidacy for the U.S. presidency at Trump Tower on Tuesday in New York. Trump is the 12th Republican who has announced running for the White House.", "I'm going to tell you a couple of stories about trade, because I'm totally against the trade bill for a number of reasons.", "Number one: the people negotiating it don't have a clue. Our president doesn't have a clue. He's a bad negotiator. He's the one that did Bergdahl. We get Bergdahl, they get five killer terrorists that everybody wanted over there. We get Bergdahl. We get a traitor. We get a no-good traitor and they get the five people that they wanted for years. And those people are now back on the battlefield trying to kill us. That's the negotiator we have", "Take a look at the deal he's making with Iran. He makes that deal, Israel maybe won't exist very long. It's a disaster and we have to protect Israel.", "So we need people - I'm a free trader. But the problem with free trade is, you need really talented people to negotiate for you. If you don't have talented people, if you don't have great leadership, if you don't have people that know business - not just a political hack that got the job because he made a contribution to a campaign, which is the way all jobs just about are gotten, free trade is terrible.", "Free trade can be wonderful if you have smart people. But we have people that are stupid. We have people that aren't smart, and we have people that are controlled by special interests and it's just not going to work.", "So here's a couple of stories. Happened recently, a friend of mine is a great manufacturer, and you know, China comes over and they dump all their stuff.", "I buy it. I buy it because, frankly, I have an obligation to buy it, because they devalue their currency so brilliantly. They just did it recently and nobody thought they could do it again, but with all our problems with Russia, with all our problems with everything, everything, they got away with it again.", "And it's impossible for our people here to compete. So I want to tell you this story. Friend of mine if a great manufacturer. Calls me up a few weeks ago, he's very upset.", "I said, 'What's your problem?'", "He said, 'You know, I make a great product.'", "I said, 'I know, I know that, because I buy the product.'", "He said, 'I can't get it into China. They won't accept it. I sent a boat over and they actually sent it back. They talked about environmental, they talked about all sorts of crap that had nothing to do with it.'", "I said, 'Oh, wait a minute, that's terrible. Did anyone know this?'", "He said, 'They do it all the time with other people.'", "I said, 'They send it back?'", "He said, 'Yea, so I finally got it over there, and they charged me a big tariff.'", "They're not supposed to be doing that. I told him. Now they do charge you tariffs on trucks when we send trucks and other things over there.", "Ask Boeing. They wanted all their patents and secrets before they agreed to buy planes from Boeing.", "Hey, I'm not saying they're stupid. I like China. I just sold an apartment for $15 million to somebody from China. Am I supposed to dislike them?", "I own a big chunk of the Bank of America building at 1290 Avenue of Americas that I got from China in a war. Very valuable. I love China.", "The biggest bank in the world is from China. You know where their United States headquarters is located? In this building, in Trump Tower.", "I love China. People say, 'Oh, you don't like China.' No, I love them, but their leaders are much smarter than our leaders. And we can't sustain ourselves with that.", "There's too much - it's like, it's like take the New England Patriots and Tom Brady and have them play your high school football team. That's the difference between China's leaders and our leaders.", "They are ripping us. We are rebuilding China. We are rebuilding many countries.", "China, you got there now - roads, bridges, schools. You never saw anything like it. They have bridges that make the George Washington Bridge look like small potatoes.", "And they're all over the place. We have all the cards, but we don't know how to use them. We don't even know that we have the cards, because our leaders don't understand the game.", "We would turn off that spigot by charging them tax until they behave properly.", "Now they're going militarily. They're building a military island in the middle of the South China Sea - a military island. Now, our country could never do that because we'd have to get environmental clearance and the environmentalists wouldn't let our country - we would never be able to build in an ocean.", "They built it in about one year, this massive military port. They're building up their military to a point that is very scary.", "You have a problem with ISIS, you have a bigger problem with China.", "And in my opinion, the new China, believe it or not, in terms of trade is Mexico.", "So this man tells me about the manufacturing. I say, 'that's a terrible story, I hate to hear it.'", "But I have another one, Ford. So Mexico takes a company, car company, that was going to build in Tennessee, rips it out. Everybody thought the deal was dead. Reported in the 'Wall Street Journal' recently.", "Everybody said that it was a done deal. It's going in, and that's going to be it, going into Tennessee -. great state, great people. All of a sudden, at the last moment, this big car manufacturer, foreign, announces they're not going to Tennessee, they're going to spend their billion dollars in Mexico instead. Not good.", "Now Ford announces a few weeks ago that Ford is going to build a $2.5 billion car and truck and parts manufacturing plant in Mexico. $2.5 billion. It's going to be one of the largest in the world. Ford - good company.", "So I announced that I'm running for President. I would, one of the early things I would do, probably before I even got in, and I wouldn't even use - you know, I know the smartest negotiators in the world.", "I know the good ones, I know the bad ones, I know the overrated ones. You've got a lot that are overrated. They get good stories because the newspapers get buffaloed. But they're not good.", "But I know the best negotiators in the world and I'd put them one for each country. Believe me folks, we will do very, very well. Very, very well.", "But I wouldn't even waste my time with this one. I would call up the head of Ford, who I know. If I was President I'd say 'Congratulations, I understand that you're building a nice, $2.5 billion dollar factory in Mexico and that you're going to take your cars and sell them to the United States. Zero tax - just across the board.'", "And you say to yourself, 'How does that help us, right? Where is that good.' It's not.", "So I'd say 'Congratulations, that's the good news. Let me give you the bad news. Every car, and every truck and every part manufactured in this plant that comes across the border, we're going to charge you a 35% tax. Okay? And that tax is going to be paid simultaneously with the transaction, and that's it.'", "Now here's what's going to happen. If it's not me in the position, if it's one of these politicians that we're running against, you know, the 400 people that we're - and here's what going to happen. They're not so stupid. They know it's not a good thing. And they may even be upset by it,", "But then they're going to get a call from their donors or probably from the lobbyists for Ford and say 'you can't do that to Ford, because Ford takes care of me, and I take care of you, and you can't do that to Ford.'", "And you know what? No problem. They're going to build in Mexico, they're going to take away thousands of jobs. That's very bad for us. So under President Trump, here's what would happen: The head of Ford will call me back, I would say within an hour after I told him the bad news, but it could be he'd want to be cool and he'll wait until the next day. You know, they want to be a little cool.", "And he'll say, 'Please, please, please.'", "He'll beg for a little while, and I'll say, 'Sorry, no interest.'", "Then he'll call all sorts of political people and I'll say 'Sorry fellas, no interest.'", "Because I don't need anybody's money. It's nice. I don't need anybody's money. I'm using my own money. I'm not using lobbyists, I'm not using donors. I don't care. I'm really rich.", "And by the way, I'm not even saying that to brag. That's the kind of mindset, that's the kind of thinking you need for this country.", "So, because we've got to make the country rich. It sounds crass. Somebody said 'oh, that's crass.' It's not crass.", "We've got $18 trillion in debt, we've got nothing but problems.", "We've got a military that needs equipment all over the place. We've got nuclear weapons that are obsolete.", "We've got nothing.", "We've got social security that's going to be destroyed if somebody like me doesn't bring money into the country. All these other people want to cut the hell out of it. I'm not going to cut it at all. I'm going to bring money in, and we're going to save it.", "But here is what's going to happen. After I'm called by 30 friends of mine who contributed to different campaigns, after I'm called by all of the special interests and by the donors and by the lobbyists - and they have zero chance at convincing me. Zero. I'll get a call they next day from the head of Ford.", "He'll say, 'Please reconsider.'", "I'll say, 'No.'", "He'll say, 'Mr. President, we've decided to move the plant back to the United States. We're not going to build it in Mexico.'", "That's it. They'll have no choice. They have no choice. There are hundred of things like that.", "I'll give you another example: Saudi Arabia. They make a billion dollars a day, a billion dollars a day.", "I love the Saudis, many are in this building. They make a billion dollars a day. Whenever they have problems, we send over the ships. We send, we're going to protect - what are we doing? They got nothing but money.", "If the right person asked them, they'd pay a fortune. They wouldn't be there except for us.", "And believe me, you look at the border with Yemen - you remember Obama a year ago, Yemen was a great victory. Two weeks later the place was blown up. Everybody.", "And they kept our equipment. They always keep our equipment. We ought to send used equipment, right? They always keep our equipment, we ought to send some real junk because, frankly, it would be - we ought to send our surplus. We're always losing this gorgeous, brand-new stuff.", "But look at that border with Saudi Arabia. Do you really think that these people are interested in Yemen? Saudi Arabia without us is gone. They're gone.", "And I'm the one that made all of the right predictions about Iraq. You know, all of these politicians that I'm running against now, it's so nice to say I'm running as opposed to if I run, if I run - I'm running.", "But all of these politicians that I'm running against now, they're trying to dissociate. I mean, you look at Bush - it took him five days to answer the question on Iraq. He couldn't answer the question. He didn't know.", "I said, 'Is he intelligent?'", "And then I looked at Rubio. He was unable to answer the question. He didn't know.", "How are these people going to lead us? How are we going to go back and made it great again? We can't They don't have a clue. They can't lead us. They can't.", "They can't even answer simple questions. It was terrible, but Saudi Arabia is in big, big trouble.", "Now, thanks to fracking and other things, the oil is all over the place. And I used to say it, there are ships at sea, and this was during the worst crisis, that were loaded up with oil. And the cartel kept the prices up because, again, they were smarter than our leaders.", "They were smarter than our leaders. There is so much wealth out there that we can make our country so rich again and, therefore, make it great again.", "Because we need money. We're dying. We're dying. We need money. We have to do it and we need the right people.", "So Ford will come back. They'll all come back. And I will say this - this is going to be an election, in my opinion, that's based on competence.", "Somebody said to me the other day, a reporter, very nice reporter - 'But Mr. Trump, you're not a nice person.'", "But actually, I am. I think I'm a nice person. Does my family like me? I think so. Look at my family.", "I'm proud of my family by the way. Speaking of my family - Melania, Barron, Kai, Donny, Dunn, Vanessa, Tiffany, Ivanka did a great job. Did she do a great job? Jarrett, Laura and Eric. I'm very proud of my family. They're a great family.", "So the report said to me the other day 'But Mr. Trump, you're not a nice person. How can you get people to vote for you?'", "I said, 'I don't know. I think that, number one, I am a nice person. I give a lot of money away to charities and other things.'", "I think I'm actually a very nice person, but I said 'This is going to be an election that's based off competence. Because people are tired of these nice people and they're tired of being ripped of by everybody in the world and they're tired of spending more money on education than any nation in the world per capita. Than any nation in the world.'", "And we're 26th in the world. Twenty-five countries are better than us at education, and some of them are like, third-world countries.", "But we're becoming a third-world country because of our infrastructure, our airports, our roads, everything.", "So one of the things I did, and I said, you know what I'll do? I'll do it. And a lot of people said 'he'll never run. Number one, he won't want to give up his lifestyle.'", "They're right about that, but I'm doing it.", "Number two - I'm a private company, so nobody knows what I'm worth. And the one thing is, when you run, you have to announce and certify to all sorts of governmental authorities, your net worth.", "So I said, 'that's okay, I'm proud of my net worth.'", "I've done an amazing job. I started off in a small office with my father in Brooklyn and Queens. And my father said - and I love my father. I learned so much. He was a great negotiator.", "I learned so much just sitting as his feet playing with blocks, listening to him negotiate with subcontractors. But I learned a lot.", "But he used to say 'Donald, don't go into Manhattan. That's the big leagues. We don't know anything about that. Don't do it.'", "But I said, 'Dad, I gotta go into Manhattan. I gotta build those buildings. I've got to do it, Dad, I've got to do it.'", "And after four or five years in Brooklyn, I ventured into Manhattan and did a lot of great deals: the Grand Hyatt hotel, I was responsible for the convention center on the west side.", "I did a lot of great deals and I did them early and young, and now I'm building all over the world. And I love what I'm doing.", "But they all said, a lot of the pundits on television, 'well Donald will never run and one of the main reasons is, he's private, and he's probably not as successful as everybody thinks.'", "So I said to myself, 'you know, nobody's ever going to know unless I run because I'm really proud of my success, I really am.'", "I've employed tens of thousands of people over my lifetime. That means medical, that means education, that means everything.", "So a large accounting firm and my accountants have been working for months because I'm big and complex and they put together a statement, a financial statement. It's a summary, but everything will be filed eventually with the government. And we don't need extensions or anything, we'll be filing it right on time.", "We don't need anything. And it was even reported incorrectly yesterday, because they said he had assets of nine billion.", "I said, 'no, that the wrong number. That's the wrong number, not assets.'", "So they put together this, and before I say it, I have to say this: I made it the old-fashioned way. It's real estate. it's labor and it's union - good and some bad - and lots of people that aren't unions and it's all over the place and building all over the world.", "And I have assets, big accounting firm - one of the most highly respected - $9,240,000,000.", "And I have liabilities of about $500 - that's long-term debt, very low interest rates.", "In fact, one of the big banks came to me, said, 'Donald, you don't have enough borrowing, can we loan you $4 billion.'", "I said 'I don't need it. I don't want it. I've been there. I don't want it.'", "But in two seconds, they give me whatever I wanted. So I have a total net worth, and now with the increase, it'll be well-over $10 billion. But here, a total net worth of net worth, not assets, not a net worth, after all debt, after all expenses, the greatest assets Trump Tower, 1290 Avenue of the Americas, Bank of America building in San Francisco, 40 Wall Street, sometimes referred to as the Trump building right opposite the New York many other places all over the world.", "So the total is $8,737,540,000.", "Now I'm not doing that, I'm not doing that to brag, because you know what? I don't have to brag. I don't have to, believe it or not.", "I'm doing that to say that that's the kind of thinking our country needs. We need that thinking. We have the opposite thinking.", "We have losers. We have losers. We have people that don't have it. We have people that are morally corrupt. We have people that are selling this country down the drain.", "So I put together this statement, and the only reason I'm telling you about it today is because we really do have to get going, because if we have another three or four years you know, we're at $8 trillion now. We're soon going to be at $20 trillion.", "According to the economists, who I'm not big believers in, but, nevertheless, this is what they're saying, that $24 trillion. We're very close, that's the point of no return. $24 trillion.", "We will be there soon. That's when we become Greece. That's when we become a country that's unsalvageable. And we're gonna be there very soon. We're gonna be there very soon.", "So, just to sum up, I would do various things very quickly. I would repeal and replace the big lie, Obamacare.", "I would build a great wall, and nobody builds walls better than me, believe me, and I'll build them very inexpensively, I will build a great, great wall on our southern border. And I will have Mexico pay for that wall.", "Mark my words.", "Nobody would be tougher on ISIS than Donald Trump. Nobody.", "I will find, within our military, I will find the General Patton or I will find General MacArthur, I will find the right guy. I will find the guy that's going to take that military and make it really work. Nobody, nobody will be pushing us around.", "I will stop Iran from getting nuclear weapons. And we won't be using a man like Secretary Kerry that has absolutely no concept of negotiation, who's making a horrible and laughable deal, who's just being tapped along as they make weapons right now, and then goes into a bicycle race at 72 years old, and falls and breaks his leg.", "I won't be doing that. And I promise I will never be in a bicycle race. That I can tell you.", "I will immediately terminate President Obama's illegal executive order on immigration, immediately.", "Fully support and back up the Second Amendment.", "Now, it's very interesting. Today I heard it. Through stupidity, in a very, very hard core prison, interestingly named Clinton, two vicious murderers, two vicious people escaped, and nobody knows where they are.", "And a woman was on television this morning, and she said, 'You know, Mr. Trump,' and she was telling other people, and I actually called her, and she said, 'You know, Mr. Trump, I always was against guns. I didn't want guns. And now since this happened,' it's up in the prison area, 'my husband and I are finally in agreement, because he wanted the guns. We now have a gun on every table. We're ready to start shooting.'", "I said, 'Very interesting.'", "So protect the Second Amendment.", "End, end Common Core. Common Core should, it is a disaster. Bush is totally in favor of Common Core.", "I don't see how he can possibly get the nomination. He's weak on immigration. He's in favor of Common Core. How the hell can you vote for this guy? You just can't do it.", "We have to end, education has to be local.", "Rebuild the country's infrastructure. Nobody can do that like me. Believe me. It will be done on time, on budget, way below cost, way below what anyone ever thought.", "I look at the roads being built all over the country, and I say I can build those things for one-third. What they do is unbelievable, how bad.", "You know, we're building on Pennsylvania Avenue, the Old Post Office, we're converting it into one of the world's great hotels. It's gonna be the best hotel in Washington, D.C. We got it from the General Services Administration in Washington. The Obama administration. We got it. It was the most highly sought after or one of them, but I think the most highly sought after project in the history of General Services.", "We got it. People were shocked, Trump got it. Well, I got it for two reasons. Number one, we're really good. Number two, we had a really good plan. And I'll add in the third, we had a great financial statement. Because the General Services, who are terrific people, by the way, and talented people, they wanted to do a great job. And they wanted to make sure it got built.", "So we have to rebuild our infrastructure, our bridges, our roadways, our airports.", "You come into LaGuardia Airport, it's like we're in a third world country. You look at the patches and the 40-year-old floor. They throw down asphalt, and they throw.", "You look at these airports, we are like a third world country. And I come in from China and I come in from Qatar and I come in from different places, and they have the most incredible airports in the world. You come to back to this country and you have LAX, disaster. You have all of these disastrous airports. We have to rebuild our infrastructure.", "Save Medicare, Medicaid and Social Security without cuts. Have to do it.", "Get rid of the fraud. Get rid of the waste and abuse, but save it. People have been paying it for years. And now many of these candidates want to cut it.", "You save it by making the United States, by making us rich again, by taking back all of the money that's being lost.", "Renegotiate our foreign trade deals.", "Reduce our $18 trillion in debt, because, believe me, we're in a bubble. We have artificially low interest rates. We have a stock market that, frankly, has been good to me, but I still hate to see what's happening. We have a stock market that is so bloated.", "Be careful of a bubble because what you've seen in the past might be small potatoes compared to what happens. So be very, very careful.", "And strengthen our military and take care of our vets. So, so important.", "Sadly, the American dream is dead. But if I get elected president I will bring it back bigger and better and stronger than ever before, and we will make America great again.", "Thank you. Thank you very much.", "I'm intelligent. Some people would say I'm very, very, very intelligent.", "I know what sells and I know what people want.", "I have a great relationship with the blacks. I've always had a great relationship with the blacks. ", "I just have great respect for them, and you know they like me.", "A well-educated black has a tremendous advantage over a well-educated white in terms of the job market. If I were starting off today, I would love to be a well-educated black, because I believe they do have an actual advantage.", "Our great African American President hasn't exactly had a positive impact on the thugs who are so happily and openly destroying Baltimore!", "I have black guys counting my money. I hate it. The only guys I want counting my money are short guys that wear yarmulkes all day.", "The concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive.", "I know the Chinese. I've made a lot of money with the Chinese. I understand the Chinese mind.", "I did very well with Chinese people. Very well. Believe me.", "Who the fuck knows? I mean, really, who knows how much the Japs will pay for Manhattan property these days? ", "The Mexican government forces many bad people into our country. Because they're smart. They're smarter than our leaders.", " ", "Jeb Bush will not be able to negotiate against Mexico. Jeb Bush with Mexico said, 'People, come in,' they come in, it's an act of love, OK?", "Jeb Bush has to like the Mexican Illegals because of his wife.", "I'll win the Latino vote because I'll create jobs. I'll create jobs and the Latinos will have jobs they didn't have.", " ", "I'm leading in the Hispanic vote, and I'm going to win the Hispanic vote. I'm also leading in the regular vote.", " ", "I don't have a racist bone in my body.", "I cherish women. I want to help women. I'm going to be able to do things for women that no other candidate would be able to do.", "I will be so good to women.", "I will be phenomenal to the women. I mean, I want to help women.", "Oftentimes when I was sleeping with one of the top women in the world I would say to myself, thinking about me as a boy from Queens, 'Can you believe what I am getting?'", "I've never had any trouble in bed.", "I have many women that work for me.", "She's not giving me 100 percent. She's giving me 84 percent, and 16 percent is going towards taking care of children.", "All of the women on The Apprentice flirted with me? consciously or unconsciously. That's to be expected.", "I have really given a lot of women great opportunity. Unfortunately, after they are a star, the fun is over for me.", "When a man leaves a woman, especially when it was perceived that he has left for a piece of ass (a good one!) there are 50 percent of the population who will love the woman who was left.", "You know who's one of the great beauties of the world, according to everybody? And I helped create her. Ivanka. My daughter, Ivanka. She's 6 feet tall, she's got the best body. She made a lot money as a model?a tremendous amount.", "Every guy in the country wants to go out with my daughter.", "She does have a very nice figure. I've said if Ivanka weren't my daughter, perhaps I'd be dating her.", "I've known Paris Hilton from the time she's 12. Her parents are friends of mine, and, you know, the first time I saw her, she walked into the room and I said, ?Who the hell is that?' Well, at 12, I wasn't interested. I've never been into that. They're sort of always stuck around that 25 category.", "There's nothing I love more than women, but they're really a lot different than portrayed. They are far worse than men, far more aggressive.", "If Hillary Clinton can't satisfy her husband what makes her think she can satisfy America?", "Women: You have to treat 'em like shit.", "What I say is what I say.", "One thing I've learned about the press is that they're always hungry for a good story, and the more sensational the better. The point is that if you are a little different, or a little outrageous, or if you do things that are bold or controversial, the press is going to write about you.", "Sometimes they write positively, and sometimes they write negatively. But from a pure business point of view, the benefits of being written about have far outweighed the drawbacks.", "Sometimes it pays to be a little wild.", "It's always good to do things nice and complicated so that nobody can figure it out.", " ", "If I get my name in the paper, if people pay attention, that's what matters.", "The press portrays me as a wild flamethrower. In actuality, I think I'm much different from that. I think I'm totally inaccurately portrayed.", "You know, it really doesn't matter what they write as long as you've got a young and beautiful piece of ass.", "There are two publics as far as I'm concerned. The real public and then there's the New York society horseshit. The real public has always liked Donald Trump. The real public feels that Donald Trump is going through Trump-bashing. When I go out now, forget about it. I'm mobbed. It's bedlam.", "Controversy, in short, sells.", "The show is ?Trump.' And it is sold-out performances everywhere.", "I play to people's fantasies. People may not always think big themselves, but they can still get very excited by those who do. That's why a little hyperbole never hurts. People want to believe that something is the biggest and the greatest and the most spectacular.", "Most people think small, because most people are afraid of success, afraid of making decisions, afraid of winning. And that gives people like me a great advantage.", "You want to know what total recognition is? I'll tell you how you know you've got it. When the Nigerians on the street corners who don't speak a word of English, who have no clue, who're selling watches for some guy in New Jersey?when you walk by and those guys say, ?Trump! Trump!' That's total recognition.", "There is something crazy, hot, a phenomenon out there? about me, but I'm not sure I can define it and I'm not sure I want to. How do you think ?The Apprentice' would have done if I wasn't a part of it? There are a lot of imitators now and we'll see how they'll do, but I think they'll crash and burn.", "Other rich people don't do commercials because no one asks them. It's just like ?The Apprentice.' I can't tell you how many of my rich friends are dying, dying to have me put them on that show.", "There's something very seductive about being a television star.", "I can't help it that I'm a celebrity. What am I going to do, hide under a stone?", "I want a very good-looking guy to play me.", "Nothing wrong with ego.", "Show me someone without an ego, and I'll show you a loser.", "One of the key problems today is that politics is such a disgrace. Good people don't go into government. I'd want to change that.", "Our leaders are stupid. They are stupid people. It's just very, very sad.", "I would hate to think that people blame me for the problems of the world. Yet people come to me and say, ?Why do you allow homelessness in the cities?' as if I control the situation. I am not somebody seeking office.", "It's very possible that I could be the first presidential candidate to run and make money on it.", "I have no intention of running for President.", "I don't want to be President. I'm 100 percent sure. I'd change my mind only if I saw this country continue to go down the tubes.", "Well, if I ever ran for office, I'd do better as a Democrat than as a Republican, and that's not because I'd be more liberal, because I'm conservative. But the working guy would elect me. He likes me.", "Overseas, we build a school, we build a road, they blow up the school, we build another school, we build another road they blow them up, we build again, in the meantime we can't get a fucking school in Brooklyn.", "What does it all mean when some wacko over in Syria can end the world with nuclear weapons?", "I think if this country gets any kinder or gentler, it's literally going to cease to exist.", "I see the values of this country in the way crime is tolerated, where the people are virtually afraid to say, ?I want the death penalty.' Well, I want it. Where has this country gone when you're not supposed to put in a grave the son of a bitch who robbed, beat, murdered and threw a 90-year-old woman off the building?", "I know politicians who love women who don't even want to be known for that, because they might lose the gay vote, OK?", "Politicians are all talk and no action. ", "When you need zone changes, you're political. You know, I'll support the Democrats, the Republicans, whatever the hell I have to support.", "I will tell you that our system is broken. I gave to many people. Before this, before two months ago, I was a businessman. I give to everybody. When they call, I give. And do you know what? When I need something from them two years later, three years later, I call them?they are there for me.", "Power corrupts. ", "Part of the beauty of me is that I am very rich.", "I'm really rich.", "My attitude is if somebody's willing to pay me $225,000 to make a speech, it seems stupid not to show up. ", "You know why I'll do it? Because I don't think anyone's ever been paid that much.", "I look very much forward to showing my financials, because they are huge.", "I have a total net worth and now with the increase it will be well over $10 billion, but here total net worth of $8 billion. Net worth?not assets, not liabilities?a net worth. I'm not doing that to brag. Because you know what? I don't have to brag. I don't have to. Believe it or not.", "People say the 80s are dead, all the luxury, the extravagance. I say, ?What?' Am I supposed to change my taste because it's a new decade? That's bullshit.", "If you don't tell people about your success, they probably won't know about it.", "I know how to sell. Selling is life. You can have the greatest singer in the world, but if nobody knows who he is, he'll never have the opportunity to sing.", "There are singers in the world with voices as good as Frank Sinatra's, but they're singing in their garages because no one has ever heard of them. You need to generate interest, and you need to create excitement.", "I've always felt that a lot of modern art is a con, and that the most successful painters are often better salesmen and promoters than they are artists.", "That's why the banks love me. They love my reputation.", "I really value my reputation and I don't hesitate to sue."
];

/**
    Warning- laggy thing above

    *
    *
    *
    *
    *
    */

var ECONOMY_QUOTES = [], FP_QUOTES = [], IMMIGRATION_QUOTES = [],
    MONEY_QUOTES = [], PERSONAL_QUOTES = [], AMERICA_QUOTES = [],
    GENERAL_QUOTES = [];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Trumper is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Trumper = function () {
    AlexaSkill.call(this, APP_ID);

    //Move if we find out where we init the whole program
    //Economy
    var tempStrArray = ["gross", "domestic", "product", "gdp", "unemployment", "underemployment", "labor", "work", "jobs", "trade", "tax"];
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStr = TRUMP_QUOTES[i];
        var tempStrSplit = tempStr.split(" ");

        l1: for(var j = 0; j < tempStrSplit.length; j++) {
            var word = tempStrSplit[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < tempStrArray.length; k++) {
                if(word === tempStrArray[k]) {
                    ECONOMY_QUOTES.push(tempStr);
                    break l1; //Stop trying for this phrase
                }
            }
        }
    }

    //FP
    tempStrArray = ["china", "mexico", "russia", "nuclear", "missile", "terrorist", "terrorists", "iraq", "iran",
        "afghanistan", "japan", "isis", "september", "eleven", "9", "11"];
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStr = TRUMP_QUOTES[i];
        var tempStrSplit = tempStr.split(" ");

        l1: for(var j = 0; j < tempStrSplit.length; j++) {
            var word = tempStrSplit[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < tempStrArray.length; k++) {
                if(word === tempStrArray[k]) {
                    FP_QUOTES.push(tempStr);
                    break l1; //Stop trying for this phrase
                }
            }
        }
    }

    tempStrArray = ["mexico", "wall", "border", "black", "latino", "spanish", "japs", "hispanic", "illegal"];
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStr = TRUMP_QUOTES[i];
        var tempStrSplit = tempStr.split(" ");

        l1: for(var j = 0; j < tempStrSplit.length; j++) {
            var word = tempStrSplit[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < tempStrArray.length; k++) {
                if(word === tempStrArray[k]) {
                    IMMIGRATION_QUOTES.push(tempStr);
                    break l1; //Stop trying for this phrase
                }
            }
        }
    }

    tempStrArray = ["federal", "deficit", "budget", "debt", "inflation", "rich", "money",
        "billion", "million", "billions", "millions", "bank", "wall", "street", "banks",
        "sell", "net", "worth", "financial"];
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStr = TRUMP_QUOTES[i];
        var tempStrSplit = tempStr.split(" ");

        l1: for(var j = 0; j < tempStrSplit.length; j++) {
            var word = tempStrSplit[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < tempStrArray.length; k++) {
                if(word === tempStrArray[k]) {
                    MONEY_QUOTES.push(tempStr);
                    break l1; //Stop trying for this phrase
                }
            }
        }
    }

    tempStrArray = ["speeches", "speech",
    "politicians", "politicial",
    "enemies", "enemy",
    "circuit", "circuits",
    "republicans", "republican", "republican",
    "democrats", "democrat", "democratic",
    "lobbyists", "lobbyist",
    "donors", "donor", "super", "pac", "superpac",
    "intelligent", "smart", "donald", "trump"];
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStr = TRUMP_QUOTES[i];
        var tempStrSplit = tempStr.split(" ");

        l1: for(var j = 0; j < tempStrSplit.length; j++) {
            var word = tempStrSplit[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < tempStrArray.length; k++) {
                if(word === tempStrArray[k]) {
                    PERSONAL_QUOTES.push(tempStr);
                    break l1; //Stop trying for this phrase
                }
            }
        }
    }

    tempStrArray = ["great",
    "promised", "land",
    "united", "states",
    "rebuild",
    "third", "world",
    "military",
    "vets", "vet",
    "veterans", "veteran", "pie", "war"];
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStr = TRUMP_QUOTES[i];
        var tempStrSplit = tempStr.split(" ");

        l1: for(var j = 0; j < tempStrSplit.length; j++) {
            var word = tempStrSplit[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < tempStrArray.length; k++) {
                if(word === tempStrArray[k]) {
                    AMERICA_QUOTES.push(tempStr);
                    break l1; //Stop trying for this phrase
                }
            }
        }
    }
};

// Extend AlexaSkill
Trumper.prototype = Object.create(AlexaSkill.prototype);
Trumper.prototype.constructor = Trumper;

Trumper.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Trumper onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);

};

Trumper.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Trumper onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleStartIntent(session, response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Trumper.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Trumper onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Trumper.prototype.intentHandlers = {
    "StartIntent": function (intent, session, response) {
        handleStartIntent(session, response);
    },

    "AskTrumpIntent": function (intent, session, response) {
        handleNewTrumpRequest(intent, session, response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("I'm Alexa Trump.  You're fired", "You're fired");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Let's make America great again!";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Let's make America great again!";
        response.tell(speechOutput);
    }
};

function handleStartIntent(session, response) {
    //Check if session variables are already initialized.
    var speechText = "";

    //Reprompt speech will be triggered if the user doesn't respond.
    var repromptText = "I'm Alexa Trump; ask me something or you're fired.";

    session.attributes.stage = 1;
    speechText = "I'm Alexa Trump; ask me something.";

    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.askWithCard(speechOutput, repromptOutput, "Trumper", speechText);
}

function handleNewTrumpRequest(intent, session, response) {
    var speechText = "";

    //Reprompt speech will be triggered if the user doesn't respond.
    var repromptText = "Ask me something or you're fired.";

    speechText = intent.slots.Keyword.value.toLowerCase();
    //speechText = selectBestResponse(speechText);
    speechText = selectBestFromBuckets(speechText);
    console.log(speechText);

    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: repromptText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.tell(speechOutput);
}

function selectBestFromBuckets(input) {
    var econPoints = 0, fpPoints = 0, immiPoints = 0, moneyPoints = 0, persPoints = 0, amerPoints = 0;

    var econ  = ["gross", "domestic", "product", "gdp", "unemployment", "underemployment", "labor", "work", "jobs", "trade", "tax"];
    var fp    = ["china", "mexico", "russia", "nuclear", "missile", "terrorist", "terrorists", "iraq", "iran",
        "afghanistan", "japan", "isis", "september", "eleven", "9", "11"];
    var immi  = ["mexico", "wall", "border", "black", "latino", "spanish", "japs", "hispanic", "illegal"];
    var money = ["federal", "deficit", "budget", "debt", "inflation", "rich", "money",
        "billion", "million", "billions", "millions", "bank", "wall", "street", "banks",
        "sell", "net", "worth", "financial"];
    var pers = ["speeches", "speech",
    "politicians", "politicial",
    "enemies", "enemy",
    "circuit", "circuits",
    "republicans", "republican", "republican",
    "democrats", "democrat", "democratic",
    "lobbyists", "lobbyist",
    "donors", "donor", "super", "pac", "superpac",
    "intelligent", "smart", "donald", "trump"];
    var amer = ["great",
    "promised", "land",
    "united", "states",
    "rebuild",
    "third", "world",
    "military",
    "vets", "vet",
    "veterans", "veteran", "pie", "war"];

    input = input.toLowerCase();
    var inputArray = input.split(" ");

    for(var i = 0; i < inputArray.length; i++) {
        for(var j = 0; j < econ.length; j++) {
            if(inputArray[i] === econ[j]) {
                econPoints = econPoints + 1;
            }
        }

        for(j = 0; j < fp.length; j++) {
            if(inputArray[i] === fp[j])
                fpPoints = fpPoints + 1;
        }
    }

    var max = econPoints;
    if(econPoints <= fpPoints) fpPoints = max;
    if(fpPoints <= immiPoints) immiPoints = max;
    if(immiPoints <= moneyPoints) moneyPoints = max;
    if(moneyPoints <= persPoints) persPoints = max;
    if(persPoints <= amerPoints) amerPoints = max;

    switch(max) {
        case econPoints: return ECONOMY_QUOTES[Math.floor(Math.random() * ECONOMY_QUOTES.length)];
        case fpPoints: return FP_QUOTES[Math.floor(Math.random() * FP_QUOTES.length)];
        case immiPoints: return IMMIGRATION_QUOTES[Math.floor(Math.random() * IMMIGRATION_QUOTES.length)];
        case moneyPoints: return MONEY_QUOTES[Math.floor(Math.random() * MONEY_QUOTES.length)];
        case persPoints: return PERSONAL_QUOTES[Math.floor(Math.random() * PERSONAL_QUOTES.length)];
        default: return AMERICA_QUOTES[Math.floor(Math.random() * AMERICA_QUOTES.length)];
    }
}

//@return a string that corresponds to the best output.
function selectBestResponse(input) {
    var hash = {};
    for(var q = 0; q < TRUMP_QUOTES.length; q++) {
        hash[TRUMP_QUOTES[q]] = 0;
    }

    input = input.toLowerCase(); //Make sure it's in all lowers
    var inputArray = input.split(" ");

    //Method 1 we're gonna try: match all words
    var numHits = 0;
    var hasHit = false;
    for(var i = 0; i < TRUMP_QUOTES.length; i++) {
        var tempStringArray = TRUMP_QUOTES[i].split(" "); //Turn the quote into words

        for(var j = 0; j < tempStringArray.length; j++) { //Go through the words array
            //Strip all the punctuation
            var word = tempStringArray[j];
            word = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //punct
            word = word.replace(/\s{2,}/g," "); //spaces
            word = word.toLowerCase(); //lowercase

            for(var k = 0; k < input.length; k++) {
                if(inputArray[k] === word) {
                    //tempCount = tempCount + 1;
                    hash[TRUMP_QUOTES[i]] = hash[TRUMP_QUOTES[i]] + 1;
                    if(!hasHit) {
                        hasHit = true;
                        numHits++;
                    }
                }
            }
        }

        hasHit = false;
    }

    //sort
    hash = Object.keys(hash).sort(function(a,b){return hash[a]-hash[b]; });

    var minimum = Math.min(10, numHits); //So we don't hit an out of bounds
    return hash[Object.keys(hash)[Math.round(Math.random() * minimum)]];
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Trumper skill.
    var trumper = new Trumper();
    trumper.execute(event, context);
};
