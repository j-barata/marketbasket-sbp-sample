/*
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package com.github.market.basket.sbp.sample.application;

import com.github.market.basket.sbp.sample.api.IFruit;
import com.github.market.basket.sbp.sample.api.IMushroom;
import com.github.market.basket.sbp.sample.api.IVegetable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MarketBasketComponent {

    @Lazy
    @Autowired
    private List<IFruit> fruits;

    @Lazy
    @Autowired
    private List<IMushroom> mushrooms;

    @Lazy
    @Autowired
    private List<IVegetable> vegetables;

    public List<String> basket() {
        List<String> basket = new ArrayList();
        if (fruits != null) {
            basket.addAll(fruits.stream().map(f -> f.type() + ':' + f.name() + ':' + f.color()).collect(Collectors.toList()));
        }
        if (mushrooms != null) {
            basket.addAll(mushrooms.stream().map(m -> m.type() + ':' + m.name() + ':' + m.color()).collect(Collectors.toList()));
        }
        if (vegetables != null) {
            basket.addAll(vegetables.stream().map(v -> v.type() + ':' + v.name() + ':' + v.color()).collect(Collectors.toList()));
        }
        return basket;
    }
}
